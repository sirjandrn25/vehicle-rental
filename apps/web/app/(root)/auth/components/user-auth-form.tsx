"use client";
import Separation from "@ui/components/separation";
import { cn } from "@ui/lib/utils";
import React from "react";
import LoginForm from "./login.form";
import { Icon } from "@ui/components/Icon";
import { Button } from "@ui/components/Button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="flex items-center justify-between gap-4">
        <Button className="flex-1" variant="outline" type="button">
          <Icon.github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button className="flex-1" variant="outline" type="button">
          <Icon.google className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>
      <Separation title="Or Continue with" />
      <LoginForm />

      {/* <Button variant="outline" type="button" disabled={isSubmitting}>
        {isSubmitting ? (
          <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icon.github className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button> */}
    </div>
  );
};

export default UserAuthForm;
