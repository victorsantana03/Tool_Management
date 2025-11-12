import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getToolsOverview() {
  const user = await getUserFromToken();

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }
  const totalTools = await prisma.tool.count();

  const toolsInUse = await prisma.tool.count({
    where: { loans: { some: { status: "EMPRESTADO" } } },
  });

  const brokenTools = await prisma.tool.count({
    where: { condition: "QUEBRADO" },
  });

  const available = totalTools - toolsInUse - brokenTools;

  return {
    totalTools,
    toolsInUse,
    brokenTools,
    available,
  };
}
