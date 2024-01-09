"use client";
import { useAuthContext } from "@context/auth.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@ui/components/Button";
import { Form } from "@ui/components/Form";
import { Icon } from "@ui/components/Icon";
import { ApiService } from "core";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputFormField } from "../../../../../src/components/FormElements/input.form.field";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof formSchema>;
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const LoginPage = () => {
  const { handleLogin } = useAuthContext();
  const { mutate: onSubmit, isPending } = useMutation({
    onMutate: async (data: FormValues) => {
      const { success, response } = await ApiService.postRequest("auth/login", {
        data,
      });
      if (success) handleLogin?.(response as any);
    },
  });

  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) });
  return (
    <div className="grid gap-4">
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            onSubmit(data);
          })}
          className="flex flex-col gap-4"
        >
          <div className="grid gap-2">
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
            {isPending && (
              <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </form>
      </Form>
      <div className="flex text-primary justify-between flex-wrap items-center gap-4 text-sm">
        <Link href={"/forgot-password"} className="hover:underline">
          Forgot Password?
        </Link>
        <Link href={"/auth/register"} className="hover:underline">
          Create An Account?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
