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
        title: "Users-Management",
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
     
    ],
  },
 
];
