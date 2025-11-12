import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getUserFromToken } from "@/lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { redirect } from "next/navigation";
import { conditionBgColors } from "@/constants/conditionColors";
import { getLoansHistory } from "@/data/get-loans-history";

const History = async () => {
  const user = await getUserFromToken();
  if (!user) {
    redirect("/login");
  }
  const history = await getLoansHistory(user.id);

  return (
    <>
      <Header />
      <main className="pt-30 pb-10 px-5 bg-gray-100 min-h-screen">
        <h1 className="font-bold text-2xl text-blue-500 pb-5">Histórico</h1>

        <div className="grid grid-cols-1 gap-4">
          {history.map((historyItem) => (
            <Card key={historyItem.id}>
              <CardContent className="flex flex-col items-center gap-3 px-3">
                <div className="flex flex-col gap-1 ">
                  <div className="flex gap-1 items-center justify-center">
                    <Badge
                      className={`rounded-full opacity-90  ${
                        conditionBgColors[historyItem.tool.condition]
                      }`}
                    >
                      <span className="text-[12px] font-normal  capitalize">
                        {historyItem.tool.condition}
                      </span>
                    </Badge>
                    <div className="bg-gray-300 rounded-full w-min h-min px-2 text-xs text-white">
                      {historyItem.tool.type.brand}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div>
                      <h3 className="font-semibold ">
                        {historyItem.tool.type.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center border-r pr-3">
                    <h3 className="font-semibold">Devolvido</h3>
                    <p>
                      {format(new Date(historyItem.endDate!), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                    <p>
                      {format(new Date(historyItem.endDate!), "HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col items-center ">
                    <h3 className="font-semibold">Emprestado</h3>
                    <p>
                      {format(new Date(historyItem.startDate), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                    <p>
                      {format(new Date(historyItem.startDate), "HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};

export default History;
