import AssessmentProblemsPage from '@/components/modules/assessmentProblem/assPlb-list';


interface PageProps {
  params: {
    assessmentId: string;
  };
}

const AssessmentProblemCompanyDashboard = ({params}:PageProps) => {
    const {assessmentId}= params

    return (
        <div>
            <AssessmentProblemsPage assessmentId={assessmentId}/>
        </div>
    );
};

export default AssessmentProblemCompanyDashboard;