"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  HandHelping,
  History,
  LayoutDashboard,
  MenuIcon,
  PowerOffIcon,
  ToolCase,
  User2Icon,
} from "lucide-react";
import Link from "next/link";

interface ClientHeaderProps {
  email: string;
}

const ClientHeader = ({ email }: ClientHeaderProps) => {
  return (
    <Card className="rounded-none">
      <CardContent className="flex justify-between">
        <h2 className="text-2xl font-bold text-blue-500">GestãoMáquinas</h2>

        <Sheet>
          <SheetTitle></SheetTitle>
          <SheetTrigger asChild>
            <Button variant={"outline"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[45%] px-2">
            <div className="mt-30 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <User2Icon />
                <p className="text-gray-400 font-semibold text-sm truncate">
                  {email}
                </p>
              </div>
              <Button variant={"outline"} className="justify-start" asChild>
                <Link href="/">
                  <LayoutDashboard className="size-5" />
                  <p>Dashboard</p>
                </Link>
              </Button>
              <Button variant={"outline"} className="justify-start" asChild>
                <Link href="/tools">
                  <ToolCase className="size-5" />
                  <p>Ferramentas</p>
                </Link>
              </Button>
              <Button variant={"outline"} className="justify-start" asChild>
                <Link href="/loans">
                  <HandHelping className="size-5" />
                  <p>Empréstimos</p>
                </Link>
              </Button>
              <Button variant={"outline"} className="justify-start" asChild>
                <Link href="/history">
                  <History className="size-5" />
                  <p>Histórico</p>
                </Link>
              </Button>
            </div>
            <SheetFooter>
              <Button
                variant={"outline"}
                className=" w-full bg-red-400"
                onClick={() => logout()}
              >
                <PowerOffIcon className="size-5" />
                <p>Sair</p>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default ClientHeader;
