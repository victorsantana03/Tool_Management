import { getLoans } from "@/data/get-loans";
import DialogTools from "@/components/DialogTools";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import { conditionBgColors } from "@/constants/conditionColors";

const Loans = async () => {
  const user = await getUserFromToken();

  if (!user) {
    redirect("/login");
  }

  const loans = await getLoans(user?.id);

  return (
    <>
      <Header />
      <main className="pt-30 px-5 bg-gray-100 min-h-screen">
        <h1 className="font-bold text-2xl text-blue-500 pb-5">
          Meus empréstimos
        </h1>

        <Card className="mb-5">
          <CardContent className="space-y-2">
            {loans.map((loan) => (
              <div
                key={loan.id}
                className="flex justify-between items-center border-b py-2 gap-4"
              >
                <div className="flex flex-col gap-1">
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

                  <div className="max-w-[130px]">
                    <h3 className="font-semibold ">{loan.tool.type.name}</h3>
                  </div>

                  <p className="text-gray-500 text-sm">
                    {loan.tool.type.description}
                  </p>
                </div>
                <DialogTools
                  toolTypeItem={loan.tool.type}
                  tool={loan.tool}
                  loan={loan}
                  title="Deseja devolver essa ferramenta?"
                  buttonName="Devolver"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Loans;
