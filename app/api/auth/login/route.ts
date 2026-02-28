import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: false });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ success: false });
  }

  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const res = NextResponse.json({
    success: true,
    name: user.name,
  });

  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
