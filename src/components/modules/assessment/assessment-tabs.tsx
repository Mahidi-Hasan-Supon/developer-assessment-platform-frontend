"use client";

import type { AssessmentStatus } from "@/types/assessment.types";

interface AssessmentTabsProps {
  activeStatus?: AssessmentStatus;
  onStatusChange: (status?: AssessmentStatus) => void;
}

const tabs: {
  label: string;
  value?: AssessmentStatus;
}[] = [
  {
    label: "All",
  },
  {
    label: "Draft",
    value: "DRAFT",
  },
  {
    label: "Published",
    value: "PUBLISHED",
  },
  {
    label: "Ongoing",
    value: "ONGOING",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Archived",
    value: "ARCHIVED",
  },
];

const AssessmentTabs = ({
  activeStatus,
  onStatusChange,
}: AssessmentTabsProps) => {
  return (
    <div className="overflow-x-auto border-b">
      <div className="flex min-w-max gap-1">
        {tabs.map((tab) => {
          const isActive = activeStatus === tab.value;

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => onStatusChange(tab.value)}
              className={`border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentTabs;