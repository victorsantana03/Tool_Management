import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserFromToken() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      role: "ADMIN" | "FUNCIONARIO";
    };
  } catch {
    return null;
  }
}
