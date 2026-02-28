import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "smartrestaurant_secret";

export function verifyAuth(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
