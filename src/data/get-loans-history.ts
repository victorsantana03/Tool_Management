import { prisma } from "@/lib/prisma";

export async function getLoansHistory(userId: string) {
  if (!userId) {
    throw new Error("Id de usuário não encontrado.");
  }
  const history = await prisma.loan.findMany({
    where: { userId: userId, status: "DEVOLVIDO" },
    include: { tool: { include: { type: true } } },
    orderBy: { endDate: "desc" },
  });

  return history;
}
