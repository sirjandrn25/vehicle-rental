import React from "react";

type SeparationProps = {
  title?: string;
};
const Separation = ({ title }: SeparationProps) => {
  return (
    <div className="relative">
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
