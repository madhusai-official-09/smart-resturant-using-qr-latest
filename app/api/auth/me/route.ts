import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("token=")[1];

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({
      user: {
        name: decoded.name || "User",
        role: decoded.role,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}
