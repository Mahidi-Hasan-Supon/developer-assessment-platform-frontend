"use client";

import { Input } from "@/components/ui/input";

interface ResultSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ResultSearch({ value, onChange }: ResultSearchProps) {
  return (
    <Input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search candidate or assessment..."
      aria-label="Search results"
      className="w-full sm:max-w-sm"
    />
  );
}
