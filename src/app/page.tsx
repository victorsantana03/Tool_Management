import { getLoans } from "@/actions/get-loans";
import { getToolsOverview } from "@/actions/get-tools-overview";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getUserFromToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LayoutDashboard, ToolCase } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserFromToken();
  if (!user) {
    redirect("/login");
  }

  const loans = await getLoans(user?.id);

  const history = await prisma.loan.findMany({
    where: { userId: user.id, status: "DEVOLVIDO" },
    include: { tool: { include: { type: true } } },
    orderBy: { endDate: "desc" },
  });

  const conditionBgColors = {
    NOVO: "bg-blue-400",
    USADO: "bg-yellow-400",
    QUEBRADO: "bg-red-400",
  };

  const { available, brokenTools, toolsInUse, totalTools } =
    await getToolsOverview();
  return (
    <>
      <Header />

      <main className="pt-30  bg-gray-100 h-screen">
        <div className="px-5 mb-7">
          <h3 className="text-xl text-gray-600 font-semibold">
            Olá, {user?.name}!
          </h3>
          <p className="text-gray-400 font-semibold text-lg">
            Hoje é{" "}
            <span className="capitalize">
              {format(new Date(), "EEEE", { locale: ptBR })},
            </span>
            <span> {format(new Date(), "dd'/'", { locale: ptBR })}</span>
            <span className="capitalize">
              {format(new Date(), "MM", { locale: ptBR })}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2  px-5 mb-5">
          <h1 className="font-bold text-2xl text-blue-500 border-r border-gray-400 pr-2">
            Dashboard
          </h1>
          <LayoutDashboard className="size-5 " />
        </div>

        <div className="pl-5 pr-1">
          <h3 className="font-bold text-gray-500 pb-2">Ferramentas em uso</h3>
          <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {loans.map((loan) => (
              <Card key={loan.id} className="py-4 min-w-[90%]">
                <Link href="/loans">
                  <CardContent className="flex justify-between items-center px-3">
                    <div className="flex flex-col gap-1 max-w-[70%]">
                      <div className="flex items-center gap-1">
                        <Badge
                          className={`rounded-full opacity-90  ${
                            conditionBgColors[loan.tool.condition]
                          }`}
                        >
                          <span className="text-[12px] font-normal  capitalize">
                            {loan.tool.condition}
                          </span>
                        </Badge>
                        <div className="bg-gray-300 rounded-full w-min h-min px-2 text-xs text-white">
                          {loan.tool.type.brand}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <h3 className="font-semibold">{loan.tool.type.name}</h3>
                      </div>

                      <p className="text-gray-500 text-sm truncate">
                        {loan.tool.type.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <h3 className="font-semibold text-gray-500">
                        Você pegou:
                      </h3>
                      <p className="text-gray-500">
                        {format(new Date(loan.startDate), "dd/MM/yyyy", {
                          locale: ptBR,
                        })}
                      </p>
                      <p className="text-gray-500">
                        {format(new Date(loan.startDate), "HH:mm", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
        <div className="pl-5 pr-1 pt-5">
          <h3 className="font-bold text-gray-500 pb-2">Usadas anteriormente</h3>
          <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
            {history.map((historyItem) => (
              <Card key={historyItem.id} className="py-4 min-w-[90%]">
                <CardContent className="flex justify-between items-center px-3">
                  <div className="flex flex-col gap-1 max-w-[70%]">
                    <div className="flex items-center gap-1">
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

                    <div className="flex gap-2">
                      <h3 className="font-semibold">
                        {historyItem.tool.type.name}
                      </h3>
                    </div>

                    <p className="text-gray-500 text-sm truncate">
                      {historyItem.tool.type.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="font-semibold text-gray-500">Devolvido:</h3>
                    <p className="text-gray-500">
                      {format(new Date(historyItem.endDate!), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </p>
                    <p className="text-gray-500">
                      {format(new Date(historyItem.endDate!), "HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/*VISÃO GERAL FERRAMENTAS*/}
        <div className="mt-5 px-5">
          <h3 className="font-bold text-gray-500 pb-2">Visão geral</h3>
          <Card className="max-w-[200px]">
            <CardContent>
              <div className="flex items-center gap-2 pb-2">
                <h3 className="text-lg font-semibold">Ferramentas</h3>
                <ToolCase className="size-5" />
              </div>

              <div>
                <p className="font-semibold">
                  <span className="font-bold text-lg">{totalTools}</span>{" "}
                  disponibilizadas
                </p>
                <p className=" font-semibold text-yellow-400">
                  <span className="font-bold text-lg ">{toolsInUse}</span> em
                  uso
                </p>
                <p className="text-red-400 font-semibold">
                  <span className="font-bold text-lg">{brokenTools}</span>{" "}
                  danificadas
                </p>
                <p className="text-blue-400 font-semibold">
                  <span className="font-bol text-lg">{available}</span>{" "}
                  disponíveis
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
