import { InputFormField } from "@components/FormElements/input.form.field";
import { useFileContext } from "@context/file.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import useCustomMutation from "@hooks/useCustomMutation.hook";
import { Button } from "@ui/components/Button";
import { Form } from "@ui/components/Form";
import { Icon } from "@ui/components/Icon";
import { DictionaryType } from "core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type RenameFileNameProps = {
  data: DictionaryType;
  callback: (response: DictionaryType) => void;
};

const formSchema = z.object({
  name: z.string().min(3).max(50),
});
const RenameFileNameForm = ({ data, callback }: RenameFileNameProps) => {
  const [error, setError] = useState<any>("");
  const { fetchFiles } = useFileContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });
  const { onSubmit, isPending } = useCustomMutation({
    endPoint: `files/${data?.id}/rename`,
    schema: formSchema,
    onSuccess: (data) => {
      fetchFiles();
      callback(data as any);
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
          label="File Name"
          control={form?.control}
          required
        />
        <Button disabled={isPending}>
          <div>
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

export default RenameFileNameForm;