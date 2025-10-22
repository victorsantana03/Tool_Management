"use server";

import { prisma } from "@/lib/prisma";

export async function getLoans(userId: string) {
  if (!userId) {
    throw new Error("Id de usuário não encontrado.");
  }

  const loan = await prisma.loan.findMany({
    where: { userId, status: "EMPRESTADO" },
    include: { tool: { include: { type: true } } },
    orderBy: { startDate: "desc" },
  });

  return loan;
}
