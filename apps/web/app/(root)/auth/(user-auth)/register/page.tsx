"use client";
import { InputFormField } from "@components/FormElements/input.form.field";
import { useAuthContext } from "@context/auth.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import { Form } from "@ui/components/Form";
import { Icon } from "@ui/components/Icon";
import { ApiService } from "core";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(4),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof formSchema>;
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const RegisterPage = () => {
  const [error, setError] = useState<any>("");
  const router = useRouter();
  const { mutate: onSubmit, isPending } = useMutation({
    onMutate: async (data: FormValues) => {
      const { success, response } = await ApiService.postRequest(
        "/auth/register",
        {
          data,
        }
      );
      if (success) router.push("/auth/login");
      else setError(response?.message);
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
        {error && <div className="text-sm text-error">{error}</div>}
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
