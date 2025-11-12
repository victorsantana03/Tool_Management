import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUsersOverview() {
  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  const usersOverview = await prisma.user.count({
    where: { role: "FUNCIONARIO" },
  });

  return usersOverview;
}
