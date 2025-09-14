import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import stripe from "@/lib/stripe";
import { Metadata } from "@/actions/createCheckoutSession";
import { headers } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Read RAW body ONCE (before anything else)
  const body = await req.text();
  const headersList = await headers();
   

  // TEMP sanity log: expect bodyLen > 0


  // Signature header (don’t await headers)
  const sig = headersList.get("stripe-signature");

    console.log("HIT WEBHOOK");
  if (!sig)
    return NextResponse.json({ error: "No signature" }, { status: 400 });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error(" STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook secret not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    // Verify against RAW TEXT body
    event = Stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 }
    );
  }

 
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

    try{
      const order = await createOrderInSanity(session);
      console.log("Order created in sanity", order);
    }catch(err){
      console.log("Eroor creating order in sanity",err);
      return NextResponse.json(
        {error:"Error creating order"},
        {status:500}
      )
    }
    return NextResponse.json({received:true});
    
    }
  


async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const{orderNumber , customerName, customerEmail, clerkUserId} = metadata as Metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ["data.price.product"],
    }
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: "reference",
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  

  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId: clerkUserId,
    email:customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount/100 : 0 ,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total /100:0,
    status: "paid",
    orderDate: new Date().toISOString(),
  });

  return order;
}
}