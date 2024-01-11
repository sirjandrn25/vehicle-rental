"use client";
import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./Dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ModalDialogInterface {
  title?: string | ReactNode;
  description?: string | ReactNode;
  children: ReactNode;
  displayLabel?: string | ReactNode;
}
const ModalDialog = ({
  title,
  description,
  children,
  displayLabel,
}: ModalDialogInterface) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{displayLabel}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalDialog;
