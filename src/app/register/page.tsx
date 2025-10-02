import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[70%]">
        <CardHeader>
          <CardTitle className="text-center border-b pb-2 text-lg ">
            Faça seu cadastro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label className="text-md">Nome</Label>

              <Input type="email" placeholder="Digite seu nome" />
            </div>
            <div className="space-y-2">
              <Label className="text-md">E-mail</Label>

              <Input type="email" placeholder="Digite seu e-mail" />
            </div>
            <div className="space-y-2">
              <Label className="text-md">Senha</Label>
              <Input type="password" placeholder="Digite sua senha" />
            </div>

            <Button className="w-full">Entrar</Button>
          </form>
          <div className="text-center mt-4">
            <Link
              href="/login"
              className="text-blue-400 underline cursor-pointer "
            >
              Já tem um cadastro? Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
