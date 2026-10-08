import AssessmentProblemList from "@/components/modules/assessmentProblem/assPlb-list";

interface AssessmentQuestionsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const AssessmentQuestionsPage = async ({
  params,
}: AssessmentQuestionsPageProps) => {
  const { id } = await params;

  return (
    <div className="space-y-6 my-5 px-5">
      <AssessmentProblemList assessmentId={id} />
    </div>
  );
};

export default AssessmentQuestionsPage;
