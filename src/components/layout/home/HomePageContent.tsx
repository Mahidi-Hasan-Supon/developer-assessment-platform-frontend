"use client";

import { useEffect, useState, type ReactNode } from "react";
import HomePageLoading from "@/components/layout/public/HomePageLoading";

export default function HomePageContent({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <HomePageLoading />;
  }

  return <>{children}</>;
}
