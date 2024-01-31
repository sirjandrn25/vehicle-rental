"use client";
import { InputFormField } from "@components/FormElements/input.form.field";
import { zodResolver } from "@hookform/resolvers/zod";
import useCustomMutation from "@hooks/useCustomMutation.hook";
import { Button } from "@ui/components/Button";
import { Form } from "@ui/components/Form";
import { Icon } from "@ui/components/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ApiEndPointConstant from "../../../../../src/lib/constants/api.endpoint.constant";

const { endPoint, schema: formSchema } = ApiEndPointConstant.auth.register;

type FormValues = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const { onSubmit, isPending, error } = useCustomMutation({
    endPoint,
    schema: formSchema,
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          await onSubmit(data);
        })}
        className="flex flex-col gap-4"
      >
        {/* {error && <div className="text-sm text-error">{error}</div>} */}
        <div className="grid gap-2">
          <InputFormField
            control={form?.control}
            name="name"
            label="Name"
            required
          />
          <InputFormField
            control={form?.control}
            name="email"
            label="Email"
            required
          />
          <InputFormField
            control={form?.control}
            name="password"
            label="Password"
            type="password"
            required
          />
        </div>

        <Button disabled={isPending}>
          {isPending && <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />}
          SignUp with Email
        </Button>

        <div className="flex text-primary justify-between flex-wrap items-center gap-4 text-sm">
          <Link href={"/auth/login"} className="hover:underline">
            Go to Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default RegisterPage;
