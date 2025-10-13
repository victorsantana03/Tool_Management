"use client";

import { createLoan } from "@/actions/create-loan";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tool, ToolType } from "@prisma/client";

import { useState } from "react";
import { toast } from "sonner";

interface DialogToolsProps {
  toolTypeItem: ToolType;
  tool: Tool;
}

const DialogTools = ({ toolTypeItem, tool }: DialogToolsProps) => {
  const conditionTextColors = {
    NOVO: "text-blue-400",
    USADO: "text-yellow-400",
    QUEBRADO: "text-red-400",
  };

  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const handleCreateLoan = async (toolId: string) => {
    try {
      await createLoan(toolId);
      toast.success("Você esta com a ferramenta");
      setDialogIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao pegar ferramenta");
    }
  };
  return (
    <>
      <Button
        disabled={tool.condition === "QUEBRADO"}
        variant="secondary"
        onClick={() => setDialogIsOpen(true)}
      >
        Usar
      </Button>
      <Dialog open={dialogIsOpen} onOpenChange={() => setDialogIsOpen(false)}>
        <DialogContent className="w-[90%]">
          <DialogHeader>
            <DialogTitle>Deseja pegar essa ferramenta emprestada?</DialogTitle>
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
              onClick={() => handleCreateLoan(tool.id)}
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
