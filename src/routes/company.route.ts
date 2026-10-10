const companyPrefix = "/company";
export const companyRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: companyPrefix,
      },
      {
        title: "Assessments",
        url: `${companyPrefix}/assessments`,
      },
      {
        title: "Problems",
        url: `${companyPrefix}/problems`,
      },
      {
        title: "AssessmentProblems",
        url: `${companyPrefix}/assessmentProblems`,
      },
      {
        title: "Invitations",
        url: `${companyPrefix}/invitations`,
      },
    ],
  },
  {
    title: "Company",
    items: [
      {
        title: "Company Profile",
        url: `${companyPrefix}/profile`,
      },
    ],
  },
];
