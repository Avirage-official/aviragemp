// app/api/webhooks/stripe/route.ts
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// ----------------------------
// Small helpers (typed, no redlines)
// ----------------------------
function unwrapStripe<T>(obj: unknown): T {
  const anyObj = obj as any;
  return anyObj && typeof anyObj === "object" && "data" in anyObj
    ? (anyObj.data as T)
    : (anyObj as T);
}

function asId(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value && "id" in (value as any)) {
    const id = (value as any).id;
    return typeof id === "string" ? id : null;
  }
  return null;
}

function unixFrom(obj: unknown, key: string): number | null {
  const v = (obj as any)?.[key];
  return typeof v === "number" ? v : null;
}

function upperCurrency(code: unknown): string {
  const c = typeof code === "string" && code.trim() ? code : "USD";
  return c.toUpperCase();
}

function billingPeriodFromInterval(interval: unknown): string {
  // You store billingPeriod as String in Prisma. Keep it consistent.
  return interval === "year" ? "YEARLY" : "MONTHLY";
}

async function resolvePriceFromSubscription(
  sub: unknown
): Promise<Stripe.Price | null> {
  // subscription.items.data[0].price can be Price | string depending on expansion
  const priceMaybe = (sub as any)?.items?.data?.[0]?.price;
  if (!priceMaybe) return null;

  if (typeof priceMaybe === "string") {
    try {
      const priceRes = await stripe.prices.retrieve(priceMaybe);
      return unwrapStripe<Stripe.Price>(priceRes);
    } catch {
      return null;
    }
  }

  // object
  return priceMaybe as Stripe.Price;
}

function amountFromPriceOrSession(
  price: Stripe.Price | null,
  session: Stripe.Checkout.Session
): number {
  const unitAmount = price?.unit_amount;
  if (typeof unitAmount === "number") return unitAmount / 100;

  const sessionTotal = (session as any)?.amount_total;
  if (typeof sessionTotal === "number") return sessionTotal / 100;

  return 0;
}

// ----------------------------
// Route handler
// ----------------------------
export async function POST(request: Request) {
  const body = await request.text();

  // ✅ Next.js 15: headers() is async
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    // =====================================================
    // 1) CHECKOUT COMPLETE (subscription created / started)
    // =====================================================
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.mode === "subscription" && session.subscription) {
        const subscriptionId = asId(session.subscription);
        const businessId = session.metadata?.businessId ?? null;

        if (!subscriptionId) {
          return NextResponse.json(
            { error: "Missing subscription id on session" },
            { status: 400 }
          );
        }
        if (!businessId) {
          return NextResponse.json(
            { error: "Missing businessId metadata" },
            { status: 400 }
          );
        }

        const subRes = await stripe.subscriptions.retrieve(subscriptionId);
        const subscription = unwrapStripe<Stripe.Subscription>(subRes);

        // Pull period safely (no Stripe typing fights)
        const cps = unixFrom(subscription, "current_period_start");
        const cpe = unixFrom(subscription, "current_period_end");
        if (!cps || !cpe) {
          return NextResponse.json(
            { error: "Subscription missing billing period fields" },
            { status: 400 }
          );
        }

        const price = await resolvePriceFromSubscription(subscription);
        const interval = price?.recurring?.interval ?? "month";
        const billingPeriod = billingPeriodFromInterval(interval);
        const amount = amountFromPriceOrSession(price, session);
        const currency = upperCurrency(price?.currency ?? (session as any)?.currency);

        // Keep BusinessProfile in sync
        await prisma.businessProfile.update({
          where: { id: businessId },
          data: {
            subscriptionStatus: "ACTIVE",
            subscriptionEndsAt: new Date(cpe * 1000),
          },
        });

        // Idempotent write: Stripe webhooks can retry
        await prisma.subscription.upsert({
          where: { stripeSubscriptionId: subscription.id },
          update: {
            tier: "basic",
            billingPeriod,
            amount,
            currency,
            status: String((subscription as any)?.status ?? "active"),
            currentPeriodStart: new Date(cps * 1000),
            currentPeriodEnd: new Date(cpe * 1000),
          },
          create: {
            businessId,
            stripeSubscriptionId: subscription.id,
            tier: "basic",
            billingPeriod,
            amount,
            currency,
            status: String((subscription as any)?.status ?? "active"),
            currentPeriodStart: new Date(cps * 1000),
            currentPeriodEnd: new Date(cpe * 1000),
          },
        });
      }
    }

    // =====================================================
    // 2) INVOICE PAID (renewal / successful payment)
    // =====================================================
    if (event.type === "invoice.paid") {
      // Stripe invoice typings vary across SDKs; this is intentional + contained.
      const invoice = event.data.object as unknown;
      const subscriptionId = asId((invoice as any)?.subscription);

      if (subscriptionId) {
        const subRes = await stripe.subscriptions.retrieve(subscriptionId);
        const subscription = unwrapStripe<Stripe.Subscription>(subRes);

        const cps = unixFrom(subscription, "current_period_start");
        const cpe = unixFrom(subscription, "current_period_end");
        if (cps && cpe) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscription.id },
            data: {
              status: String((subscription as any)?.status ?? "active"),
              currentPeriodStart: new Date(cps * 1000),
              currentPeriodEnd: new Date(cpe * 1000),
            },
          });

          const sub = await prisma.subscription.findFirst({
            where: { stripeSubscriptionId: subscription.id },
          });

          if (sub) {
            await prisma.businessProfile.update({
              where: { id: sub.businessId },
              data: {
                subscriptionStatus: "ACTIVE",
                subscriptionEndsAt: new Date(cpe * 1000),
              },
            });
          }
        }
      }
    }

    // =====================================================
    // 3) SUBSCRIPTION DELETED (cancelled)
    // =====================================================
    if (event.type === "customer.subscription.deleted") {
      const cancelled = event.data.object as Stripe.Subscription;

      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: cancelled.id },
        data: { status: "cancelled" },
      });

      const sub = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: cancelled.id },
      });

      if (sub) {
        await prisma.businessProfile.update({
          where: { id: sub.businessId },
          data: {
            subscriptionStatus: "CANCELLED",
            // optional: keep endsAt, or clear it. I’m clearing it to avoid “active until” confusion.
            subscriptionEndsAt: null,
          },
        });
      }
    }

    // =====================================================
    // 4) PAYMENT FAILED (past due)
    // =====================================================
    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as unknown;
      const subscriptionId = asId((invoice as any)?.subscription);

      if (subscriptionId) {
        const sub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscriptionId },
        });

        if (sub) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscriptionId },
            data: { status: "past_due" },
          });

          await prisma.businessProfile.update({
            where: { id: sub.businessId },
            data: { subscriptionStatus: "PAST_DUE" },
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
