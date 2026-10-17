import Footer from "@/components/layout/public/Footer";
import Header from "@/components/layout/public/Header";
import HomePageLoading from "@/components/layout/public/HomePageLoading";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <HomePageLoading> */}
        <main className="flex-1">{children}</main>
      {/* </HomePageLoading> */}
      <Footer />
    </div>
  );
}
