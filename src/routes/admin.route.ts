const adminPrefix = "/admin";


export const adminRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Overview",
        url: adminPrefix,
      },
      {
        title: "Users",
        url: `${adminPrefix}/users`,
      },
      {
        title: "Approve company",
        url: `${adminPrefix}/approve-company`,
      },
      {
        title: "Assessments",
        url: `${adminPrefix}/assessments`,
      },
      {
        title: "Problems",
        url: `${adminPrefix}/problems`,
      },
    ],
  },
  {
    title: "Assessment Activity",
    items: [
      {
        title: "Attempts",
        url: `${adminPrefix}/attempts`,
      },
      {
        title: "Submissions",
        url: `${adminPrefix}/submissions`,
      },
      {
        title: "Results",
        url: `${adminPrefix}/results`,
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        title: "Transactions",
        url: `${adminPrefix}/payments`,
      },
    ],
  },
];
