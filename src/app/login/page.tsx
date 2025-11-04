"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  //TODO: QUANDO ESTIVER LOGADO NÃO PODE ACESSAR ESSA PAGE
  //TODO: VALIDAÇÃO DOS INPUTS
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();

      if (!res.ok) {
        console.error(body?.error);
        toast.error(body?.error);
        return;
      }
      toast.success(body.message);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[70%]">
        <CardHeader>
          <CardTitle className="text-center border-b pb-2 text-lg ">
            Faça Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label className="text-md">Usuário</Label>

              <Input
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-md">Senha</Label>
              <Input
                type="password"
                placeholder="Digite sua senha"
                {...register("password")}
              />
            </div>

            <Button className="w-full">Entrar</Button>
          </form>
          <div className="text-center mt-2">
            <p className="font-semibold text-sm">ou</p>
            <Link
              href="/register"
              className="text-blue-400 underline cursor-pointer "
            >
              Fazer cadastro
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
