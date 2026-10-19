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
        title: "Users Management",
        url: `${adminPrefix}/user`,
      },
      {
        title: "Approve Company",
        url: `${adminPrefix}/approve-company`,
      },
      {
        title: "Assessment Problems",
        url: `${adminPrefix}/assessment-problems`,
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
        title: "Results Management",
        url: `${adminPrefix}/results`,
      },
    ],
  },
];
