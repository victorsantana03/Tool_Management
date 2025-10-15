"use server";

import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function returnLoan(loanId: string) {
  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  if (!loanId) {
    throw new Error("ID do empréstimo não encontrado.");
  }
  const loan = await prisma.loan.findUnique({ where: { id: loanId } });

  if (!loan) {
    throw new Error("Empréstimo não encontrado.");
  }

  await prisma.loan.update({
    where: { id: loanId },
    data: {
      status: "DEVOLVIDO",
      endDate: new Date(),
    },
  });

  revalidatePath("/loans");
}
