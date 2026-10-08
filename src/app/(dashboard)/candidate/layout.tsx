import RoleGuard from "@/auth/role-guard";
import DashboardShell from "@/components/dashboard/shell";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard roles={["CANDIDATE"]}>
      <DashboardShell role="CANDIDATE">{children}</DashboardShell>
    </RoleGuard>
  );
}
