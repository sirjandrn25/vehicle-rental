"use client";
import { Icon } from "@ui/components/Icon";
import React from "react";

const PageLoader = () => {
  return (
    <div className="h-full w-full">
      <Icon.spinner className="h-10 w-10" />
    </div>
  );
};

export default PageLoader;
