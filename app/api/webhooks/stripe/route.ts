import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature" },
      { status: 400 }
    );
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
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  try {
    // Handle subscription created (after successful checkout)
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.mode === "subscription" && session.subscription) {
        const subscriptionId = typeof session.subscription === 'string' 
          ? session.subscription 
          : (session.subscription as any).id;
          
        const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
        
        const businessId = session.metadata?.businessId;
        
        if (businessId && subscription) {
          // Update business profile to ACTIVE
          await prisma.businessProfile.update({
            where: { id: businessId },
            data: {
              subscriptionStatus: "ACTIVE",
              subscriptionEndsAt: new Date(subscription.current_period_end * 1000),
            },
          });

          // Create subscription record
          await prisma.subscription.create({
            data: {
              businessId,
              stripeSubscriptionId: subscription.id,
              tier: "basic",
              billingPeriod: "MONTHLY",
              amount: 99,
              currency: "USD",
              status: subscription.status,
              currentPeriodStart: new Date(subscription.current_period_start * 1000),
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
          });
        }
      }
    }

    // Handle subscription renewal
    if (event.type === "invoice.paid") {
      const invoice = event.data.object as any;
      
      const subscriptionId = invoice.subscription 
        ? (typeof invoice.subscription === 'string' 
            ? invoice.subscription 
            : invoice.subscription.id)
        : null;
      
      if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
        
        if (subscription) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subscriptionId },
            data: {
              status: "active",
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
    }

    // Handle subscription cancelled
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;
      
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: "cancelled" },
      });

      const sub = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: subscription.id },
      });

      if (sub) {
        await prisma.businessProfile.update({
          where: { id: sub.businessId },
          data: { subscriptionStatus: "CANCELLED" },
        });
      }
    }

    // Handle payment failed
    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as any;
      
      const subscriptionId = invoice.subscription
        ? (typeof invoice.subscription === 'string' 
            ? invoice.subscription 
            : (invoice.subscription as any).id)
        : null;
      
      if (subscriptionId) {
        const subscription = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscriptionId },
        });

        if (subscription) {
          await prisma.businessProfile.update({
            where: { id: subscription.businessId },
            data: { subscriptionStatus: "PAST_DUE" },
          });
        }
      }
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}