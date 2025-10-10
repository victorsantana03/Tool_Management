import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface userType {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "FUNCIONARIO";
}

export async function getUserFromToken() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as userType;
  } catch {
    return null;
  }
}
