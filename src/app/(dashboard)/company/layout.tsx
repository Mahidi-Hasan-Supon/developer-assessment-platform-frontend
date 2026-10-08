import RoleGuard from "@/auth/role-guard";
import DashboardShell from "@/components/dashboard/shell";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["COMPANY"]}>
      <DashboardShell role="COMPANY">{children}</DashboardShell>
    </RoleGuard>
  );
}
