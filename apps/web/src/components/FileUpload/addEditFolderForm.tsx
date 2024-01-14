"use client";
import { InputFormField } from "@components/FormElements/input.form.field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import { Form } from "@ui/components/Form";
import { Icon } from "@ui/components/Icon";
import ModalDialog from "@ui/components/modal.dialog";
import { ApiService } from "core";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(50),
});
type FormValues = z.infer<typeof formSchema>;
const AddEditFolderForm = ({
  children,
  callback,
}: {
  children: any;
  callback: any;
}) => {
  const [error, setError] = useState<any>("");
  const modalRef = useRef<any>();
  const { mutate: onSubmit, isPending } = useMutation({
    onMutate: async (data: FormValues) => {
      const { success } = await ApiService.postRequest("/folders", {
        data,
      });
      if (success) {
        modalRef.current.handleClose();
        callback?.();
      }
    },
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  return (
    <ModalDialog
      ref={modalRef}
      displayLabel={children}
      title={"Create New Folder"}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            await onSubmit(data as FormValues);
          })}
          className="flex flex-col gap-4"
        >
          {error && <div className="text-sm text-error">{error}</div>}
          <InputFormField
            name="name"
            label="Folder Name"
            control={form?.control}
            required
          />
          <Button disabled={isPending}>
            {isPending && (
              <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Folder
          </Button>
        </form>
      </Form>
    </ModalDialog>
  );
};

export default AddEditFolderForm;
