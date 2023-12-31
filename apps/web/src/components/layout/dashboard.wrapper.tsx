"use client";
import { useRouter } from "next/navigation";
import React, { ReactElement, ReactNode } from "react";
import { Button } from "ui";

const DashboardWrapper = ({
  children,
  title,
  description,
  rightComponent,
  isBack,
}: {
  children: ReactNode;
  title: string | ReactNode;
  description?: string;
  rightComponent?: ReactElement;
  isBack?: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-8 px-6 ">
      <div className="flex justify-between py-4 border-b">
        <div className="flex flex-col ">
          <div className="text-2xl font-semibold">{title}</div>
          <div className="">{description}</div>
        </div>
        {rightComponent}
        {isBack && (
          <Button size={"sm"} onClick={() => router.back()}>
            Back
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default DashboardWrapper;
