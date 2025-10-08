import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // limpa as tabelas (apenas para desenvolvimento)
  await prisma.tool.deleteMany();
  await prisma.toolType.deleteMany();

  // cria os tipos de ferramentas
  const drill = await prisma.toolType.create({
    data: {
      name: "Furadeira 500W",
      brand: "Bosch", // 👈 Nova propriedade
      description: "Furadeira elétrica para uso doméstico e profissional",
    },
  });

  const hammer = await prisma.toolType.create({
    data: {
      name: "Martelo de Unha 300g",
      brand: "Tramontina", // 👈 Nova propriedade
      description: "Martelo com cabo de madeira reforçado",
    },
  });

  const screwdriver = await prisma.toolType.create({
    data: {
      name: "Chave de Fenda Philips 5mm",
      brand: "Stanley", // 👈 Nova propriedade
      description: "Chave de fenda ideal para pequenos reparos",
    },
  });

  // cria as unidades físicas de cada tipo
  await prisma.tool.createMany({
    data: [
      // Furadeiras
      { condition: "NOVO", typeId: drill.id },
      { condition: "NOVO", typeId: drill.id },
      { condition: "USADO", typeId: drill.id },
      { condition: "QUEBRADO", typeId: drill.id },

      // Martelos
      { condition: "NOVO", typeId: hammer.id },
      { condition: "USADO", typeId: hammer.id },
      { condition: "USADO", typeId: hammer.id },

      // Chaves de fenda
      { condition: "NOVO", typeId: screwdriver.id },
      { condition: "NOVO", typeId: screwdriver.id },
      { condition: "QUEBRADO", typeId: screwdriver.id },
    ],
  });

  console.log("✅ Seed inserida com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
