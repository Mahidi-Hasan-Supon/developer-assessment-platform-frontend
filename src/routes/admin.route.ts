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
        url: `${adminPrefix}/user-management`,
      },
      {
        title: "Approve Company",
        url: `${adminPrefix}/approve-company`,
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
