"use client";

import { useState } from "react";
import Link from "next/link";

import type { Assessment } from "@/types/assessment.types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteAssessmentSheet from "./delete-assessment";
import PublishAssessmentSheet from "./assessment-publish-sheet";
import StartAssessmentSheet from "./start-assessment-sheet";

interface AssessmentTableProps {
  assessments: Assessment[];
}

const statusStyles = {
  DRAFT:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",

  PUBLISHED:
    "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",

  ONGOING: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",

  COMPLETED:
    "border-gray-500/30 bg-gray-500/10 text-gray-600 dark:text-gray-400",

  ARCHIVED: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
};

const AssessmentTable = ({ assessments }: AssessmentTableProps) => {
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment | null>(null);
  const [publishingAssessment, setPublishingAssessment] =
    useState<Assessment | null>(null);
  const [startingAssessment, setStartingAssessment] =
    useState<Assessment | null>(null);

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[280px]">Assessment</TableHead>

                  <TableHead>Status</TableHead>

                  <TableHead>Duration</TableHead>

                  <TableHead>Marks</TableHead>

                  <TableHead>Pass Marks</TableHead>

                  <TableHead>Price</TableHead>

                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {assessments.map((assessment) => (
                  <TableRow key={assessment.id} className="hover:bg-muted/50">
                    {/* Assessment */}
                    <TableCell>
                      <div className="max-w-[320px] space-y-1">
                        <p className="truncate font-medium">
                          {assessment.title}
                        </p>

                        {assessment.description && (
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {assessment.description}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusStyles[assessment.status]}
                      >
                        {assessment.status}
                      </Badge>
                    </TableCell>

                    {/* Duration */}
                    <TableCell>
                      <span className="whitespace-nowrap">
                        {assessment.durationMinutes} min
                      </span>
                    </TableCell>

                    {/* Total Marks */}
                    <TableCell>{assessment.totalMarks}</TableCell>

                    {/* Pass Marks */}
                    <TableCell>{assessment.passMarks}</TableCell>

                    {/* Price */}
                    <TableCell>
                      <span className="whitespace-nowrap font-medium">
                        {assessment.price === 0
                          ? "Free"
                          : `৳${assessment.price}`}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Link
                            href={`/company/assessments/${assessment.id}/edit`}
                          >
                            Edit
                          </Link>
                        </Button>

                        {/* <Button size="sm">
                          <Link
                            href={`/company/assessments/${assessment.id}/questions`}
                          >
                            {assessment.status === "DRAFT"
                              ? "Continue create problem/question"
                              : "Manage"}
                          </Link>
                        </Button> */}
                        {/* ongoing */}
                        {/* {assessment.status === "PUBLISHED" && (
                          <Button
                            size="sm"
                            onClick={() => setStartingAssessment(assessment)}
                          >
                            Start
                          </Button>
                        )} */}
                        {/* published btn */}
                        {assessment.status === "DRAFT" && (
                          <Button
                            size="sm"
                            onClick={() => setPublishingAssessment(assessment)}
                          >
                            Publish
                          </Button>
                        )}

                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={
                            assessment.status === "ONGOING" ||
                            assessment.status === "COMPLETED" ||
                            assessment.status === "ARCHIVED"
                          }
                          onClick={() => setSelectedAssessment(assessment)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedAssessment && (
        <DeleteAssessmentSheet
          assessment={selectedAssessment}
          open={!!selectedAssessment}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedAssessment(null);
            }
          }}
        />
      )}
      {/* publish sheet */}
      {publishingAssessment && (
        <PublishAssessmentSheet
          assessment={publishingAssessment}
          open={!!publishingAssessment}
          onOpenChange={(open) => {
            if (!open) {
              setPublishingAssessment(null);
            }
          }}
        />
      )}
      {/* start assessment */}
      {/* {startingAssessment && (
        <StartAssessmentSheet
          assessment={startingAssessment}
          open={!!startingAssessment}
          onOpenChange={(open) => {
            if (!open) {
              setStartingAssessment(null);
            }
          }}
        />
      )} */}
    </>
  );
};

export default AssessmentTable;
