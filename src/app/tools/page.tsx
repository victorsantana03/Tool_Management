import Header from "@/components/Header";
import SearchInput from "@/components/Search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

const toolType = await prisma.toolType.findMany({
  include: { tools: true },
});

const Tools = () => {
  const conditionColors = {
    NOVO: "bg-blue-400",
    USADO: "bg-yellow-400",
    QUEBRADO: "bg-red-400",
  };
  return (
    <>
      <Header />
      <main className="pt-30 px-5 bg-gray-100 h-screen">
        <div className="pb-5">
          <SearchInput />
        </div>

        <h1 className="font-bold text-2xl text-blue-500 pb-5">Ferramentas</h1>
        <Card className="mb-5">
          <CardContent className="space-y-2">
            {toolType.map((toolTypeItem) =>
              toolTypeItem.tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex justify-between items-center border-b py-2 gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <Badge
                      className={`rounded-full opacity-90  ${
                        conditionColors[tool.condition]
                      }`}
                    >
                      <span className="text-[12px] font-normal">
                        {tool.condition}
                      </span>
                    </Badge>
                    <div className="flex gap-2">
                      <h3 className="font-semibold">{toolTypeItem.name}</h3>
                      <Badge className="bg-gray-300 rounded-full">
                        {toolTypeItem.brand}
                      </Badge>
                    </div>

                    <p className="text-gray-500 text-sm">
                      {toolTypeItem.description}
                    </p>
                  </div>

                  <Button
                    disabled={tool.condition === "QUEBRADO"}
                    variant="secondary"
                  >
                    Usar
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Tools;
