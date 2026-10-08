"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CompanyApproveTable from "./company-approve-table";

import {
  CompanyApplication,
  CompanyApplicationTab,
  CompanyStatus,
} from "@/types/company.types";
import {
  useCompanyApplications,
  useUpdateCompanyStatus,
} from "@/hook/company.hook";
import { toast } from "@/components/ui/toast";
import CompanyApproveTableLoading from "./company-table-loading";
import CompanyApproveSheet from "./company-reject-sheet";

const CompanyApproveTabs = () => {
  const [activeTab, setActiveTab] = useState<CompanyApplicationTab>("ALL");

  const [selectedCompany, setSelectedCompany] =
    useState<CompanyApplication | null>(null);

  const { data, isLoading, refetch } = useCompanyApplications(
    activeTab === "ALL" ? undefined : activeTab,
  );

  const { mutate: updateStatus, isPending } = useUpdateCompanyStatus();

  const applications = data?.data ?? [];

  const handleApprove = (application: CompanyApplication) => {
    updateStatus(
      {
        id: application.id,
        payload: {
          status: "APPROVED",
        },
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Success",
            description: "Company application approved successfully.",
            type: "success",
          });

          refetch();
        },

        onError: () => {
          toast.add({
            title: "Error",
            description: "Failed to approve company application.",
            type: "error",
          });
        },
      },
    );
  };

  const handleReject = (application: CompanyApplication) => {
    setSelectedCompany(application);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Company Applications</h1>

        <p className="text-muted-foreground">
          Review and manage company applications.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as CompanyApplicationTab)}
      >
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="APPROVED">Approved</TabsTrigger>
          <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {isLoading ? (
            <CompanyApproveTableLoading />
          ) : applications.length === 0 ? (
            <div className="rounded-md border py-12 text-center">
              <p className="text-muted-foreground">
                No {activeTab.toLowerCase()} company applications found.
              </p>
            </div>
          ) : (
            <CompanyApproveTable
              applications={applications}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
        </TabsContent>
      </Tabs>

      {selectedCompany && (
        <CompanyApproveSheet
          company={selectedCompany}
          open={!!selectedCompany}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedCompany(null);
            }
          }}
          onSuccess={() => {
            setSelectedCompany(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default CompanyApproveTabs;
