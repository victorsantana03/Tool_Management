import { prisma } from "@/lib/prisma";

export async function getToolsOverview() {
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
