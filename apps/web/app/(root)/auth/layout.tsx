import React from "react";

const AuthLayout = ({ children }: any) => {
  return (
    <div className="container h-screen w-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
