"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import { useGetMe } from "@/hook";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { isPending, isError, data } = useGetMe();
  //   console.log(data);
  const user = data?.data;

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      return router.replace("/login");
    }
  }, [router, user, isError, isPending]);
  if (isError || !user) {
    return <AuthLoading lebel="Redirecting...." />;
  }
  if (isPending) {
    return <AuthLoading />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
