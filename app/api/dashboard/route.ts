import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import User from "@/lib/models/User";

export async function GET() {
  await connectDB();

  /* ✅ FIXED COOKIE ACCESS */
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  /* ---------------- ORDERS ---------------- */
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  /* ---------------- TODAY REVENUE ---------------- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayOrders = await Order.find({
    createdAt: { $gte: today },
  });

  const revenue = todayOrders.reduce(
    (sum, o) =>
      sum +
      o.items.reduce(
        (s: number, i: any) => s + i.price * i.quantity,
        0
      ),
    0
  );

  return NextResponse.json({
    success: true,
    orders,
    revenue,
    totalOrders: todayOrders.length,
  });
}