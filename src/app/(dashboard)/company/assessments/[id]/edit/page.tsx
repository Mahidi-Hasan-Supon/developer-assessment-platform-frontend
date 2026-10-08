import EditAssessmentForm from "@/components/form/editAssessmentForm";

interface EditAssessmentPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditAssessmentPage = async ({
  params,
}: EditAssessmentPageProps) => {
  const { id } = await params;

  return <EditAssessmentForm assessmentId={id} />;
};

export default EditAssessmentPage;