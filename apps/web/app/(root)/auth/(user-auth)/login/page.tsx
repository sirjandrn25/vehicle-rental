"use client";
import { UserSessionType, useAuthContext } from "@context/auth.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import useCustomMutation from "@hooks/useCustomMutation.hook";
import { Button } from "@ui/components/Button";
import { Form } from "@ui/components/Form";
import { Icon } from "@ui/components/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputFormField } from "../../../../../src/components/FormElements/input.form.field";
import ApiEndPointConstant from "../../../../../src/lib/constants/api.endpoint.constant";

const { endPoint, schema: formSchema } = ApiEndPointConstant.auth.login;
type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const { handleLogin } = useAuthContext();
  const { onSubmit, isPending, error } = useCustomMutation<UserSessionType>({
    endPoint,
    schema: formSchema,
    onSuccess: handleLogin,
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
          {/* {error && <div className="text-sm text-error">{error}</div>} */}
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
