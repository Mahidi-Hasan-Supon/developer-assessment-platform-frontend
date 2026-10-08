"use client";
import { LoaderIcon } from "lucide-react";
import React from "react";

const AuthLoading = ({ lebel = "Verifying-Account" }: { lebel?: string }) => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex gap-3">
        <LoaderIcon size={6} animate-spin="true" />
        {lebel}
      </div>
    </div>
  );
};

export default AuthLoading;
