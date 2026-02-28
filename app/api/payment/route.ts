import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  const { amount } = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY!,
    key_secret: process.env.RAZORPAY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  return NextResponse.json({
    success: true,
    orderId: order.id,
    amount: order.amount,
  });
}
console.log(process.env.RAZORPAY_KEY);