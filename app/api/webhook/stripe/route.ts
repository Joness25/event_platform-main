// import stripe from "stripe";
// import { NextResponse } from "next/server";
// import { createOrder } from "@/lib/actions/order.actions";

// export async function POST(request: Request) {
//   const body = await request.text();

//   const sig = request.headers.get("stripe-signature") as string;
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//     console.log(event);
//   } catch (err) {
//     return NextResponse.json({ message: "Webhook error", error: err });
//   }

//   // Get the ID and type
//   const eventType = event.type;

//   // CREATE
//   if (eventType === "checkout.session.completed") {
//     const { id, amount_total, metadata } = event.data.object;

//     const order = {
//       stripeId: id,
//       eventId: metadata?.eventId || "",
//       buyerId: metadata?.buyerId || "",
//       totalAmount: amount_total ? (amount_total / 100).toString() : "0",
//       createdAt: new Date(),
//     };

//     const newOrder = await createOrder(order);
//     return NextResponse.json({ message: "OK", order: newOrder });
//   }

//   return new Response("", { status: 200 });
// }

import stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import { createNgoProfileOrder } from "@/lib/actions/ngoProfileOrders";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    console.log(event);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  // Get the ID and type
  const eventType = event.type;

  // CREATE
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;

    const order = {
      stripeId: id,
      ngoProfileId: metadata?.ngoProfileId || "",
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: new Date(),
    };

    const newOrder = await createNgoProfileOrder(order);
    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return new Response("", { status: 200 });
}

// import stripe from "stripe";
// import { NextResponse } from "next/server";
// import { createOrder } from "@/lib/actions/order.actions";
// import { createNgoProfileOrder } from "@/lib/actions/ngoProfileOrders";
// import { createBusinessOrder } from "@/lib/actions/businessOrders";

// export async function POST(request: Request) {
//   const body = await request.text();

//   const sig = request.headers.get("stripe-signature") as string;
//   const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//     console.log(event);
//   } catch (err) {
//     return NextResponse.json({ message: "Webhook error", error: err });
//   }

//   // Get the ID and type
//   const eventType = event.type;

//   // CREATE
//   if (eventType === "checkout.session.completed") {
//     const { id, amount_total, metadata } = event.data.object;

//     const order = {
//       stripeId: id,
//       totalAmount: amount_total ? (amount_total / 100).toString() : "0",
//       createdAt: new Date(),
//       ngoProfileId: metadata?.ngoProfileId || "",
//       buyerId: metadata?.buyerId || "",
//     };

//     const newOrder = await createNgoProfileOrder(order);

//     return NextResponse.json({ message: "OK", order: newOrder });
//   }

//   return new Response("", { status: 200 });
// }
// createNgoProfileOrder
// createBusinessOrder
// export type CreateBusinessOrderParams = {
//   stripeId: string;
//   totalAmount: string;
//   createdAt: Date;
//   product: string;
//   businessAdId: string;
//   buyerId: string;
//   databaseType: string;
// };

// export type CreateNgoProfileOrderParams = {
//   stripeId: string;
//   totalAmount: string;
//   createdAt: Date;
//   product: string;
//   ngoProfileId: string;
//   buyerId: string;
//   databaseType: string;
// };
