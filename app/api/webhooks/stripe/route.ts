import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// Stripe Node often returns Stripe.Response<T> (wrapped). This normalizes it.
function unwrapStripe<T>(obj: any): T {
  return obj && typeof obj === "object" && "data" in obj ? (obj.data as T) : (obj as T);
}

export async function POST(request: Request) {
  const body = await request.text();

  const headersList = await headers(); // ✅ Next 15
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
    /* =====================================================
       SUBSCRIPTION CREATED (Checkout success)
    ===================================================== */
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.mode === "subscription" && session.subscription) {
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : (session.subscription as any).id;

        const subRes = await stripe.subscriptions.retrieve(subscriptionId);
        const subscription = unwrapStripe<any>(subRes);


        const businessId = session.metadata?.businessId;
        if (!businessId) throw new Error("Missing businessId in Stripe metadata");

        const price = subscription.items?.data?.[0]?.price;
        const interval = price?.recurring?.interval ?? "month";

        const billingPeriod = interval === "year" ? "YEARLY" : "MONTHLY";

        const amount =
          ((price?.unit_amount ?? session.amount_total ?? 0) as number) / 100;

        const currency = String(
          price?.currency ?? session.currency ?? "USD"
        ).toUpperCase();

        await prisma.businessProfile.update({
          where: { id: businessId },
          data: {
            subscriptionStatus: "ACTIVE",
            subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
          },
        });

        await prisma.subscription.create({
          data: {
            businessId,
            stripeSubscriptionId: subscription.id,
            tier: "basic",
            billingPeriod,
            amount,
            currency,
            status: String(subscription.status),
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
      }
    }

    /* =====================================================
       SUBSCRIPTION RENEWED
       NOTE: Stripe Invoice typings differ across versions.
       We intentionally treat invoice as "any" here to avoid build errors.
    ===================================================== */
    if (event.type === "invoice.paid") {
      const invoice = event.data.object as any;

      const subscriptionId = invoice?.subscription
        ? typeof invoice.subscription === "string"
          ? invoice.subscription
          : invoice.subscription.id
        : null;

      if (subscriptionId) {
       const subRes = await stripe.subscriptions.retrieve(subscriptionId);
       
       const subscription = unwrapStripe<any>(subRes);


        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: {
            status: String(subscription.status),
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        const sub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscriptionId },
        });

        if (sub) {
          await prisma.businessProfile.update({
            where: { id: sub.businessId },
            data: {
              subscriptionStatus: "ACTIVE",
              subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
            },
          });
        }
      }
    }

    /* =====================================================
       SUBSCRIPTION CANCELLED
    ===================================================== */
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
          data: { subscriptionStatus: "CANCELLED" },
        });
      }
    }

    /* =====================================================
       PAYMENT FAILED
    ===================================================== */
    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as any;

      const subscriptionId = invoice?.subscription
        ? typeof invoice.subscription === "string"
          ? invoice.subscription
          : invoice.subscription.id
        : null;

      if (subscriptionId) {
        const sub = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscriptionId },
        });

        if (sub) {
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
