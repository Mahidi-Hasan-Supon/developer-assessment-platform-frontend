import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AssessmentProblemLoading = () => {
  const loadingRows = ["one", "two", "three", "four", "five"];
  return (
    <div className="space-y-4">
      <div>
        <div className="h-6 w-48 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-muted" />
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loadingRows.map((key) => (
              <TableRow key={key}>
                <TableCell>
                  <div className="h-4 w-8 animate-pulse rounded bg-muted" />
                </TableCell>

                <TableCell>
                  <div className="space-y-2">
                    <div className="h-4 w-52 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-72 animate-pulse rounded bg-muted" />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                </TableCell>

                <TableCell>
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </TableCell>

                <TableCell>
                  <div className="h-4 w-12 animate-pulse rounded bg-muted" />
                </TableCell>

                <TableCell>
                  <div className="ml-auto flex justify-end gap-2">
                    <div className="h-8 w-16 animate-pulse rounded bg-muted" />
                    <div className="h-8 w-20 animate-pulse rounded bg-muted" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AssessmentProblemLoading;
