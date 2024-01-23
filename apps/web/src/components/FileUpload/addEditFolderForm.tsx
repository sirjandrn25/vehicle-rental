"use client";
import { InputFormField } from "@components/FormElements/input.form.field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/components/Button";
import { Form } from "@ui/components/Form";
import { Icon } from "@ui/components/Icon";
import ModalDialog from "@ui/components/modal.dialog";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(50),
});

type FormValues = z.infer<typeof formSchema>;
const AddEditFolderForm = ({
  children,
  onSubmit,
}: {
  children: any;
  onSubmit: (data: FormValues) => Promise<void>;
}) => {
  const [error, setError] = useState<any>("");
  const modalRef = useRef<any>();

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
            modalRef.current?.handleClose();
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
          <Button disabled={form.formState.isLoading}>
            {form.formState.isLoading && (
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
