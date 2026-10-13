import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface CandidatesLoadingProps {
  count?: number;
}

export function CandidatesLoading({ count = 10 }: CandidatesLoadingProps) {
  const skeletonIds = useMemo(() => {
    return Array.from({ length: count }, () => crypto.randomUUID());
  }, [count]);

  return (
    <>
      {skeletonIds.map((id) => (
        <TableRow key={id}>
          <TableCell>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-44" />
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-16" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="ml-auto h-8 w-24" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
