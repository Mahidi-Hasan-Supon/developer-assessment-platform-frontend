"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Code2,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Code2,
    title: "Coding Challenges",
    description:
      "Solve technical problems and demonstrate your programming skills.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Track Your Progress",
    description:
      "Review your assessment results and discover areas to improve.",
  },
];

export default function HeroSection() {
  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* Full-width background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />

      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:gap-16">
        {/* এখা
নে তোমার existing Hero content এবং Feature panel থাকবে */}
      </div>
    </section>
  );
}
