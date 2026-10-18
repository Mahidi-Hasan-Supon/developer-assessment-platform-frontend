import AuthGuard from "@/auth/auth-guard";
import HomePageContent from "@/components/layout/home/HomePageContent";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <HomePageContent>
      <div>
        <AuthGuard>{children}</AuthGuard>
      </div>
    </HomePageContent>
  );
}
