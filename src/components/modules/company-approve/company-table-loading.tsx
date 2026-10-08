import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const loadingRows = ["row-1", "row-2", "row-3", "row-4", "row-5"];

const loadingCells = [
  "company",
  "applicant",
  "industry",
  "location",
  "status",
  "action",
];

const CompanyApproveTableLoading = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Applicant</TableHead>
          <TableHead>Industry</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loadingRows.map((row) => (
          <TableRow key={row}>
            {loadingCells.map((cell) => (
              <TableCell key={cell}>
                <Skeleton className="h-5 w-full max-w-[140px]" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CompanyApproveTableLoading;
