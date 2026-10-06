import React, { ReactNode } from "react";
import QueryProviders from "./query.provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryProviders>{children}</QueryProviders>;
};

export default Providers;
