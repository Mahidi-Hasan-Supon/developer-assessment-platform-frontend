import React, { ReactNode } from "react";
import QueryProviders from "./query.provider";
import GoogleProvider from "./google-auth-provider";
import { Tooltip } from "@/components/ui/tooltip";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleProvider>
      <QueryProviders>
        <Tooltip>{children}</Tooltip>
      </QueryProviders>
    </GoogleProvider>
  );
};

export default Providers;
