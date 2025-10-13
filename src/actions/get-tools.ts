"use server";

import { prisma } from "@/lib/prisma";

export async function getTools() {
  const toolType = await prisma.toolType.findMany({
    include: {
      tools: {
        where: { loans: { none: { status: "EMPRESTADO" } } },
      },
    },
  });

  return toolType;
}
