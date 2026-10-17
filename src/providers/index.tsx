import React, { ReactNode } from "react";
import QueryProviders from "./query.provider";
import GoogleProvider from "./google-auth-provider";
import { Tooltip } from "@/components/ui/tooltip";
import ThemeProvider from "./themeProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <GoogleProvider>
        <QueryProviders>
          <Tooltip>{children}</Tooltip>
        </QueryProviders>
      </GoogleProvider>
    </ThemeProvider>
  );
};

export default Providers;
