// import { title } from "process";

// const companyPrefix = "/company";
// export const companyRoutes = [
//   {
//     title: "Management",
//     items: [
//       {
//         title: "Overview",
//         url: companyPrefix,
//       },
//       {
//         title: "Assessments",
//         url: `${companyPrefix}/assessments`,
//       },
//       {
//         title: "Problems",
//         url: `${companyPrefix}/problems`,
//       },
//       {
//         title: "AssessmentProblems",
//         url: `${companyPrefix}/assessmentProblems`,
//       },
//       {
//         title: "Invitations",
//         url: `${companyPrefix}/invitations`,
//       },
//     ],
//   },{
//     title:"My Activity",
//     items:[
//       {
//         title: "Submissions",
//         url: `${companyPrefix}/submissions`,
//       }
//     ]
//   },
//   {
//     title: "Company",
//     items: [
//       {
//         title: "Company Profile",
//         url: `${companyPrefix}/profile`,
//       },
//     ],
//   },
// ];

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
        title: "Create Assessment",
        url: `${companyPrefix}/assessments/create`,
      },
      {
        title: "Create Problem",
        url: `${companyPrefix}/problems/create`,
      },
      {
        title: "Problems",
        url: `${companyPrefix}/problems`,
      },
      {
        title: "Assessment Problems",
        url: `${companyPrefix}/assessment-problems`,
      },
    ],
  },
  {
    title: "Candidates",
    items: [
      {
        title: "Invitations",
        url: `${companyPrefix}/invitations`,
      },
      {
        title: "Candidates",
        url: `${companyPrefix}/candidates`,
      },
    ],
  },
  {
    title: "Evaluation",
    items: [
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
      {
        title: "Settings",
        url: `${companyPrefix}/settings`,
      },
    ],
  },
];
