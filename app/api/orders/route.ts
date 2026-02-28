import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

/* =====================
   CREATE ORDER
===================== */
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    /* ✅ Get token correctly (Next.js 14+) */
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    /* ✅ Decode user */
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const { table, items } = await req.json();

    /* ✅ Save user id inside order */
    const order = await Order.create({
      table,
      items,
      user: decoded.id,
      status: "Preparing",
    });

    return NextResponse.json(
      { success: true, order },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/* =====================
   GET ORDERS + AUTO FINISH
===================== */
export async function GET() {
  try {
    await connectDB();

    /* ✅ IMPORTANT: populate user name */
    const orders = await Order.find()
      .populate("user", "name email") // ⭐ THIS FIXES YOUR ISSUE
      .sort({ createdAt: -1 });

    const now = new Date();

    for (const order of orders) {
      if (order.status === "Served") {
        order.status = "Finished";
        await order.save();
        continue;
      }

      if (order.status === "Preparing") {
        const diffMinutes =
          (now.getTime() - order.createdAt.getTime()) / 60000;

        if (diffMinutes >= 10) {
          order.status = "Finished";
          await order.save();
        }
      }
    }

    return NextResponse.json(
      { success: true, orders },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}