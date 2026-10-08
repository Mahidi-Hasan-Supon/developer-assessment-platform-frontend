"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { CompanyApplication } from "@/types/company.types";

interface CompanyApproveTableProps {
  applications: CompanyApplication[];
  onApprove: (application: CompanyApplication) => void;
  onReject: (application: CompanyApplication) => void;
}

const CompanyApproveTable = ({
  applications,
  onApprove,
  onReject,
}: CompanyApproveTableProps) => {
  return (
    <div className="rounded-md border">
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
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>
                <div>
                  <p className="font-medium">
                    {application.companyName || "N/A"}
                  </p>

                  {application.website && (
                    <p className="text-muted-foreground text-sm">
                      {application.website}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="font-medium">{application.user.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {application.user.email}
                  </p>
                </div>
              </TableCell>

              <TableCell>{application.industry || "N/A"}</TableCell>

              <TableCell>{application.location || "N/A"}</TableCell>

              <TableCell>
                {application.status === "PENDING" && (
                  <Badge className="border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50">
                    Pending
                  </Badge>
                )}

                {application.status === "APPROVED" && (
                  <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                    Approved
                  </Badge>
                )}

                {application.status === "REJECTED" && (
                  <Badge className="border-red-200 bg-red-50 text-red-700 hover:bg-red-50">
                    Rejected
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  {application.status === "PENDING" && (
                    <>
                      <Button size="sm" onClick={() => onApprove(application)}>
                        Approve
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onReject(application)}
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {application.status === "APPROVED" && (
                    <Button size="sm" variant="outline" disabled>
                      Review
                    </Button>
                  )}

                  {application.status === "REJECTED" && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled
                    >
                      Review
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyApproveTable;
