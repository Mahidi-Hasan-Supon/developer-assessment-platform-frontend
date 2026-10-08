import { Skeleton } from "@/components/ui/skeleton";

const AssessmentQuestionsLoading = () => {
  return (
    <div className="mx-4 space-y-6 py-6 sm:mx-6 lg:mx-10 lg:py-10">
      <div className="space-y-3">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>

      <Skeleton className="h-32 w-full rounded-lg" />

      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
};

export default AssessmentQuestionsLoading;
