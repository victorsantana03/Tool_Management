"use client";

import { createLoan } from "@/actions/create-loan";
import { returnLoan } from "@/actions/return-loan";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loan, Tool, ToolType } from "@prisma/client";

import { useState } from "react";
import { toast } from "sonner";

interface DialogToolsProps {
  toolTypeItem: ToolType;
  tool: Tool;
  loan?: Loan;
  title: string;
  buttonName: string;
}

const DialogTools = ({
  toolTypeItem,
  tool,
  loan,
  title,
  buttonName,
}: DialogToolsProps) => {
  const conditionTextColors = {
    NOVO: "text-blue-400",
    USADO: "text-yellow-400",
    QUEBRADO: "text-red-400",
  };

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const id = loan ? loan.id : tool.id;

  const handleLoan = async (id: string) => {
    if (!loan) {
      try {
        await createLoan(id);
        toast.success("Você esta com a ferramenta");
        setDialogIsOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao pegar ferramenta");
      }
    } else {
      try {
        await returnLoan(id);
        toast.success("Você devolveu a ferramenta");
        setDialogIsOpen(false);
      } catch (error) {
        console.error(error);
        toast.error("Erro ao devolver a ferramenta");
      }
    }
  };
  return (
    <>
      <Button
        disabled={tool.condition === "QUEBRADO"}
        variant="secondary"
        onClick={() => setDialogIsOpen(true)}
      >
        {buttonName}
      </Button>
      <Dialog open={dialogIsOpen} onOpenChange={() => setDialogIsOpen(false)}>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <h3 className="font-semibold">
              {toolTypeItem.name} -{" "}
              <span className="text-gray-400 text-sm">
                {toolTypeItem.brand}
              </span>{" "}
              |{" "}
              <span
                className={`rounded-full opacity-90 lowercase ${
                  conditionTextColors[tool.condition]
                }`}
              >
                {tool.condition}
              </span>
            </h3>
          </div>
          <DialogFooter className="flex flex-col items-center">
            <Button
              className="w-[80%] bg-blue-400 text-white"
              onClick={() => handleLoan(id)}
            >
              Confirmar
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-[80%]">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogTools;
