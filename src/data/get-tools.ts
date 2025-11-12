import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getTools() {
  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  const toolType = await prisma.toolType.findMany({
    include: {
      tools: {
        where: { loans: { none: { status: "EMPRESTADO" } } },
      },
    },
  });

  return toolType;
}
