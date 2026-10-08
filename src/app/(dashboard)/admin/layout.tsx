import RoleGuard from "@/auth/role-guard";
import DashboardShell from "@/components/dashboard/shell";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["ADMIN"]}>
      <DashboardShell role="ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
};

export default layout;
