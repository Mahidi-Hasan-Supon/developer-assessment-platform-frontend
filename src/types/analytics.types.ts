export interface CompanyAnalytics {
  totalAssessments: number;
  publishedAssessments: number;
  totalInvitations: number;
  acceptedInvitations: number;
  totalAttempts: number;
  totalSubmissions: number;
  totalResults: number;
  passedResults: number;
  failedResults: number;
  passRate: number;
  totalRevenue: number;
}
export interface CandidateAnalytics {
  averageScore: number;
  completedAttempts: number;
  failedResults: number;
  passRate: number;
  passedResults: number;
  totalAttempts: number;
  totalResults: number;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalCandidates: number;
  totalCompanies: number;
  totalAssessments: number;
  totalProblems: number;
  totalAttempts: number;
  totalSubmissions: number;
  totalResults: number;
  passedResults: number;
  failedResults: number;
  passRate: number;
  totalRevenue: number;
}
