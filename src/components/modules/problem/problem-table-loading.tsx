import { Skeleton } from "@/components/ui/skeleton";

const skeletonRows = [
  "skeleton-1",
  "skeleton-2",
  "skeleton-3",
  "skeleton-4",
  "skeleton-5",
];

const ProblemTableLoading = () => {
  return (
    <div className="rounded-lg border">
      <div className="grid grid-cols-5 gap-4 border-b bg-muted/40 px-4 py-3 text-sm font-medium">
        <div>Title</div>
        <div>Type</div>
        <div>Difficulty</div>
        <div>Marks</div>
        <div>Action</div>
      </div>

      <div className="divide-y">
        {skeletonRows.map((row) => (
          <div
            key={row}
            className="grid grid-cols-5 items-center gap-4 px-4 py-4"
          >
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemTableLoading;
