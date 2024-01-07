"use client";
import { useAuthContext } from "@context/auth.provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@ui/components/Button";
import { Icon } from "@ui/components/Icon";
import { Input } from "@ui/components/Input";
import { cn } from "@ui/lib/utils";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type FormValues = z.infer<typeof formSchema>;
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const { handleLogin } = useAuthContext();
  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    await handleLogin?.({ email, password }, (response) => {
      console.log(response);
    });
  };
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label>Email</Label>
            <Input
              type="email"
              {...register("email", { required: true })}
              placeholder="name@gmail.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="grid gap-1">
            <Label>Password</Label>
            <Input
              type="password"
              {...register("password", { required: true })}
              required
              autoComplete="current-password"
            />
          </div>

          <Button disabled={isSubmitting}>
            {isSubmitting && (
              <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isSubmitting}>
        {isSubmitting ? (
          <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icon.github className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
};

export default UserAuthForm;
