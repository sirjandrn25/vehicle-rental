import React, { useCallback } from "react";

import {
  BaseInputFormProps,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/Form";
import { Input, PasswordInput } from "@ui/components/Input";
import { Textarea } from "@ui/components/textarea";
import { cn } from "../../modules/ui/lib/utils";

interface InputFormFieldProps extends BaseInputFormProps {
  type?: "text" | "textarea" | "number" | "password";
  [key: string]: any;
}

export const InputFormField = React.forwardRef(
  (
    {
      name,
      label,
      control,
      placeholder,
      type = "text",
      required,
      itemClassName,
      ...rest
    }: InputFormFieldProps,
    ref: any
  ) => {
    const renderElement = useCallback((field: any) => {
      switch (type) {
        case "textarea":
          return (
            <Textarea
              {...field}
              placeholder={placeholder ?? `Enter ${label}`}
              {...rest}
            />
          );
        case "password":
          return (
            <PasswordInput
              {...field}
              placeholder={placeholder ?? `Enter ${label}`}
              {...rest}
            />
          );
        default:
          return (
            <Input
              {...field}
              {...rest}
              type={type}
              onChange={(e) => {
                if (type === "number")
                  field.onChange(
                    e.target.value ? Number(e.target.value) : e.target.value
                  );
                else field.onChange(e.target.value);
              }}
              placeholder={placeholder ?? `Enter ${label}`}
            />
          );
      }
    }, []);
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem ref={ref} className={cn("w-full", itemClassName)}>
              {label && (
                <FormLabel>
                  {label}{" "}
                  {required && <span className="text-destructive">*</span>}
                </FormLabel>
              )}
              <FormControl>{renderElement(field)}</FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  }
);
