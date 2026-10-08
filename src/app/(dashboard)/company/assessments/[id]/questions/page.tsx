import AssessmentQuestions from "@/components/modules/assessment/question/assessment-question";

interface AssessmentQuestionsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AssessmentQuestionsPage({
  params,
}: AssessmentQuestionsPageProps) {
  const { id } = await params;

  return <AssessmentQuestions assessmentId={id} />;
}
