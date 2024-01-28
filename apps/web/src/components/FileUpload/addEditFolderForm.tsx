"use client";
import { InputFormField } from "@components/FormElements/input.form.field";
import { useFolderContext } from "@context/folder.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import { Form } from "@ui/components/Form";
import { Icon } from "@ui/components/Icon";
import { ApiService, DictionaryType } from "core";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(50),
});

type FormValues = z.infer<typeof formSchema>;

interface AddEditFolderFormProps {
  callback: (response: DictionaryType) => void;
  data?: DictionaryType;
}
const AddEditFolderForm = ({ callback, data = {} }: AddEditFolderFormProps) => {
  const [error, setError] = useState<any>("");
  const { fetchList } = useFolderContext();
  const isEdit = data?.id;
  const { folder_id } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });
  const { mutate: onSubmit, isPending } = useMutation({
    onMutate: async (values: any) => {
      const { success, response } = await ApiService.postRequest(
        isEdit ? `/folders/${data?.id}/rename` : "/folders",
        {
          data: {
            ...values,
            parent_id: folder_id,
          },
          method: isEdit ? "put" : "post",
        }
      );
      if (!success) return setError(response?.message);
      fetchList();
      callback(response);
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => onSubmit(data))}
        className="flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {error && <div className="text-sm text-error">{error}</div>}
        <InputFormField
          name="name"
          label="Folder Name"
          control={form?.control}
          required
        />
        <Button disabled={isPending}>
          <div>
            {" "}
            {isPending && (
              <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save
          </div>
        </Button>
      </form>
    </Form>
  );
};

// export const AddEditFolderFormDialog = forwardRef(
//   (
//     {
//       children,
//       onSubmit,
//     }: {
//       children: any;
//       onSubmit: (data: FormValues) => Promise<void>;
//     },
//     ref: any
//   ) => {
//     const [error, setError] = useState<any>("");
//     const modalRef = useRef<any>();
//     useImperativeHandle(
//       ref,
//       () => {
//         return {
//           handleOpen: () => modalRef?.current?.handleOpen(),
//         };
//       },
//       [ref]
//     );

//     return (
//       <ModalDialog
//         ref={modalRef}
//         displayLabel={children}
//         title={"Create New Folder"}
//       ></ModalDialog>
//     );
//   }
// );

export default AddEditFolderForm;
