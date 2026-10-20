"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CompanyApproveTable from "./company-approve-table";

import {
  CompanyApplication,
  CompanyApplicationTab,   
} from "@/types/company.types";
import {
  useCompanyApplications,
  useUpdateCompanyStatus,
} from "@/hook/company.hook";
import { toast } from "@/components/ui/toast";
import CompanyApproveTableLoading from "./company-table-loading";
import CompanyApproveSheet from "./company-reject-sheet";
import CompanyPagination from "./company-approve-pagination";

const ITEMS_PER_PAGE = 10; // প্রতি পেজে কতটি আইটেম দেখাবে

const CompanyApproveTabs = () => {
  const [activeTab, setActiveTab] = useState<CompanyApplicationTab>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedCompany, setSelectedCompany] =
    useState<CompanyApplication | null>(null);

  // ব্যাকএন্ডে পেজ নাম্বার সাপোর্ট করলে (page, limit) পাস করতে পারেন
  const { data, isLoading, refetch } = useCompanyApplications(
    activeTab === "ALL" ? undefined : activeTab,
  );

  const { mutate: updateStatus } = useUpdateCompanyStatus();

  const applications = data?.data ?? [];

  // Client-side pagination logic (যদি API থেকে meta pagination না আসে)
  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApplications = applications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value as CompanyApplicationTab);
    setCurrentPage(1); // ট্যাব চেঞ্জ করলে পেজ ১-এ রিসেট হবে
  };

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

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="APPROVED">Approved</TabsTrigger>
          <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6 space-y-4">
          {isLoading ? (
            <CompanyApproveTableLoading />
          ) : applications.length === 0 ? (
            <div className="rounded-md border py-12 text-center">
              <p className="text-muted-foreground">
                No {activeTab.toLowerCase()} company applications found.
              </p>
            </div>
          ) : (
            <>
              <CompanyApproveTable
                applications={paginatedApplications}
                onApprove={handleApprove}
                onReject={handleReject}
              />

              {/* 👇 Pagination Component Call */}
              <CompanyPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
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
