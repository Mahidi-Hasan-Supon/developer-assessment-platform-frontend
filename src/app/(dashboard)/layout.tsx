import AuthGuard from "@/auth/auth-guard";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div >
       <AuthGuard>{children}</AuthGuard>
    </div>
  );
}
