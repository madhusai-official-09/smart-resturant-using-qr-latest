import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Order from "@/lib/models/Order";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  await connectDB();

  const token = req.headers.get("cookie")?.split("token=")[1];
  const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);

  if (decoded.role !== "admin") {
    return NextResponse.json({ success: false }, { status: 403 });
  }

  const orders = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, orders });
}

export async function PUT(req: Request) {
  await connectDB();
  const { id, status } = await req.json();

  await Order.findByIdAndUpdate(id, { status });
  return NextResponse.json({ success: true });
}
