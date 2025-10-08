"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await fetch("/api/register", {
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
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[70%]">
        <CardHeader>
          <CardTitle className="text-center border-b pb-2 text-lg ">
            Faça seu cadastro
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/*NOME*/}
            <div className="space-y-2">
              <Label className="text-md">Nome</Label>
              <Input
                type="text"
                placeholder="Digite seu nome"
                {...register("name")}
              />
            </div>

            {/*E-MAIL*/}
            <div className="space-y-2">
              <Label className="text-md">E-mail</Label>

              <Input
                type="email"
                placeholder="Digite seu e-mail"
                {...register("email")}
              />
            </div>

            {/*SENHA*/}
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
