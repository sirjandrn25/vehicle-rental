"use client";
import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
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
const ModalDialog = forwardRef(
  (
    { title, description, children, displayLabel }: ModalDialogInterface,
    ref: any
  ) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        handleClose: () => setOpen(false),
        handleOpen: () => setOpen(true),
      }),
      []
    );

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{displayLabel}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);

export default ModalDialog;
