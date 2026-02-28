import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: false, message: "User not found" });
  }

  // 🔐 Generate token
  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 min
  await user.save();

  // 🚀 Send token to frontend (for now)
  return NextResponse.json({
    success: true,
    token, // IMPORTANT
  });
}
