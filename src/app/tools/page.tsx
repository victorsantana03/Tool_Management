import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Tools = () => {
  return (
    <>
      <Header />
      <main className="pt-30 px-5 bg-gray-100 h-screen">
        <div className="flex items-center gap-3 pb-5">
          <Input
            type="text"
            placeholder="Buscar por nome da ferramenta:"
            className="bg-white"
          />
          <Button variant="outline">
            <Search />
          </Button>
        </div>

        <Card>
          <CardContent>
            <h1>Ferramentas</h1>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Tools;
