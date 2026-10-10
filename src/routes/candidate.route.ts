// const candidatePrefix = "/candidate";

// export const candidateRoutes = [
//   {
//     title: "Assessments",
//     items: [
//       {
//         title: "Overview",
//         url: candidatePrefix,
//       },
//       // {
//       //   title: "Available Assessments",
//       //   url: `${candidatePrefix}/assessments`,
//       // },
//       // {
//       //   title: "My Assessments",
//       //   url: `${candidatePrefix}/my-assessments`,
//       // },
//       // {
//       //   title: "Invitations",
//       //   url: `${candidatePrefix}/invitations`,
//       // },
//     ],
//   },
//   {
//     title: "My Activity",
//     items: [
//       {
//         title: "Attempts",
//         url: `${candidatePrefix}/attempts`,
//       },
//       {
//         title: "Submissions",
//         url: `${candidatePrefix}/submissions`,
//       },
//       {
//         title: "Results",
//         url: `${candidatePrefix}/results`,
//       },
//     ],
//   },
//   {
//     title: "Profile",
//     items: [
//       {
//         title: "My Profile",
//         url: `${candidatePrefix}/profile`,
//       },
//     ],
//   },
// ];

const candidatePrefix = "/candidate";
 
export const candidateRoutes = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: candidatePrefix,
      },
    ],
  },
  {
    title: "My Activity",
    items: [
     
     
      {
        title: "Submissions",
        url: `${candidatePrefix}/submissions`,
      },
      {
        title: "Results",
        url: `${candidatePrefix}/results`,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "My Profile",
        url: `${candidatePrefix}/profile`,
      },
    ],
  },
];
