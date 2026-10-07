import DashboardShell from "@/components/dashboard/shell";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <DashboardShell role="ADMIN">{children}</DashboardShell>;
};

export default layout;
