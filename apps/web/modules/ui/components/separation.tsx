import { cn } from "@ui/lib/utils";
import React from "react";

type SeparationProps = {
  title?: string;
  className?: string;
};
const Separation = ({ title, className }: SeparationProps) => {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          {title}
        </span>
      </div>
    </div>
  );
};

export default Separation;
