"use client";

import React from "react";
import { Icon } from "./Icon";
import { Input } from "./Input";

export function PasswordInput({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={`relative ${className}`}>
      <Input
        type={showPassword ? "text" : "password"}
        className="pr-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 flex items-center pr-4 text-xl text-primary"
      >
        {showPassword ? (
          <Icon.hide className="w-4 h-4" />
        ) : (
          <Icon.show className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
