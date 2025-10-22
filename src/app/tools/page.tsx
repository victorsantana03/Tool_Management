import Header from "@/components/Header";
import SearchInput from "@/components/Search";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";

import { getTools } from "@/actions/get-tools";
import DialogTools from "../../components/DialogTools";

const Tools = async () => {
  const toolType = await getTools();

  const conditionBgColors = {
    NOVO: "bg-blue-400",
    USADO: "bg-yellow-400",
    QUEBRADO: "bg-red-400",
  };
  return (
    <div>
      <Header />
      <main className="pt-30 px-5 bg-gray-100 h-screen">
        <h1 className="font-bold text-2xl text-blue-500 pb-5">Ferramentas</h1>
        <div className="pb-5">
          <SearchInput />
        </div>
        <Card className="mb-5">
          <CardContent className="space-y-2 px-3">
            {toolType.map((toolTypeItem) =>
              toolTypeItem.tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex justify-between items-center border-b py-2 gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Badge
                        className={`rounded-full opacity-90  ${
                          conditionBgColors[tool.condition]
                        }`}
                      >
                        <span className="text-[12px] font-normal  capitalize">
                          {tool.condition}
                        </span>
                      </Badge>
                      <div className="bg-gray-300 rounded-full w-min h-min px-2 text-xs text-white">
                        {toolTypeItem.brand}
                      </div>
                    </div>

                    <div className="max-w-[130px]">
                      <h3 className="font-semibold ">{toolTypeItem.name}</h3>
                    </div>

                    <p className="text-gray-500 text-sm">
                      {toolTypeItem.description}
                    </p>
                  </div>
                  <DialogTools
                    toolTypeItem={toolTypeItem}
                    tool={tool}
                    title="Deseja pegar essa ferramenta emprestada?"
                    buttonName="Usar"
                  />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Tools;
