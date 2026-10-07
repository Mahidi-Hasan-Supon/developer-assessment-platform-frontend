const companyPrefix = "/dashboard/company";
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
        title: "Invitations",
        url: `${companyPrefix}/invitations`,
      },
    ],
  },
  {
    title: "Assessment Activity",
    items: [
      {
        title: "Attempts",
        url: `${companyPrefix}/attempts`,
      },
      {
        title: "Submissions",
        url: `${companyPrefix}/submissions`,
      },
      {
        title: "Results",
        url: `${companyPrefix}/results`,
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
