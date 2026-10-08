import EditProblemForm from "@/components/form/editProblemForm";

interface EditProblemPageProps {
  params: Promise<{
    id: string;
  }>;
}

const EditProblemPage = async ({
  params,
}: EditProblemPageProps) => {
  const { id } = await params;

  return <EditProblemForm problemId={id} />;
};

export default EditProblemPage;