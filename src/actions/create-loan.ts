"use server";
import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLoan(toolId: string) {
  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  if (user.role !== "FUNCIONARIO") {
    throw new Error("Somente funcionários podem usar esta ação.");
  }

  const isLoanExisting = await prisma.loan.findFirst({
    where: { toolId, status: "EMPRESTADO" },
  });

  if (isLoanExisting) {
    throw new Error("Ferramenta já está em uso.");
  }

  await prisma.loan.create({
    data: {
      toolId,
      userId: user.id,
      status: "EMPRESTADO",
    },
  });

  revalidatePath("/tools");
}
