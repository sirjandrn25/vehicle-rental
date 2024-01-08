import { cn } from "@ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, suffix, type, ...props }, ref) => {
    const inputClassName =
      "border-input placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:border-primary flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50";

    if (prefix || suffix)
      return (
        <div className={cn("relative flex items-center", className)}>
          <input
            type={type}
            className={cn(inputClassName, prefix && "pl-8", suffix && "pr-8")}
            ref={ref}
            {...props}
          />
          {prefix && <span className="absolute left-2">{prefix}</span>}
          {suffix && <span className="absolute right-2">{suffix}</span>}
        </div>
      );
    return (
      <input
        type={type}
        className={cn(inputClassName, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

interface PasswordInputInterface extends Omit<InputProps, "type"> {
  enableEye?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props: PasswordInputInterface, ref) => {
    const [open, setOpen] = React.useState(false);
    return (
      <Input
        ref={ref}
        type={open ? "text" : "password"}
        suffix={
          open ? (
            <EyeOff
              size={18}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <Eye
              size={18}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )
        }
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
