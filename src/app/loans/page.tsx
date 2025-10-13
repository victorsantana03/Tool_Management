import { getLoans } from "@/actions/get-loans";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";

const Loans = async () => {
  const user = await getUserFromToken();

  if (!user) {
    redirect("/");
  }

  const loans = await getLoans(user?.id);

  const conditionBgColors = {
    NOVO: "bg-blue-400",
    USADO: "bg-yellow-400",
    QUEBRADO: "bg-red-400",
  };

  return (
    <>
      <Header />
      <main className="pt-30 px-5">
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
                  <Badge
                    className={`rounded-full opacity-90  ${
                      conditionBgColors[loan.tool.condition]
                    }`}
                  >
                    <span className="text-[12px] font-normal  capitalize">
                      {loan.tool.condition}
                    </span>
                  </Badge>
                  <div className="flex gap-2">
                    <h3 className="font-semibold">{loan.tool.type.name}</h3>
                    <Badge className="bg-gray-300 rounded-full">
                      {loan.tool.type.brand}
                    </Badge>
                  </div>

                  <p className="text-gray-500 text-sm">
                    {loan.tool.type.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Loans;
