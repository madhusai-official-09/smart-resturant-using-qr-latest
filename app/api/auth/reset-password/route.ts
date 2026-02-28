import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();
  const { token, password } = await req.json();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  // 🔐 Update password
  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return NextResponse.json({ success: true });
}
