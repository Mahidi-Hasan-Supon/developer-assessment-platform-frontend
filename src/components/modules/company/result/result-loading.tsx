import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ResultLoading() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-44 animate-pulse rounded bg-muted" />
        <div className="h-4 w-64 animate-pulse rounded bg-muted" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="h-10 w-full animate-pulse rounded bg-muted" />

        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-12 w-full animate-pulse rounded bg-muted"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
