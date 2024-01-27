import Stripe from 'stripe';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import { CartProductType } from '@/app/product/[productId]/ProductDetailsComponent';
import { getCurrentUser } from '@/services/getCurrentUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  const price: any = Math.floor(totalPrice);
  return price;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    // If paymentIntentId is provided, update the existing payment intent
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        {
          amount: total,
        }
      );

      // Update the order if the paymentIntentId matches

      const updated_order = await prisma.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: {
          amount: total,
          products: items,
        },
      });

     /* if (!existing_order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }*/

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    // If paymentIntentId is not provided, create a new payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    // Create the order
    const orderData = {
      user: { connect: { id: currentUser.id } },
      amount: total,
      currency: 'usd',
      status: 'pending',
      deliveryStatus: 'pending',
      paymentIntentId: payment_intent_id,
      products: items,
    };

    orderData.paymentIntentId = paymentIntent.id;

    await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }

   return NextResponse.error();
}
