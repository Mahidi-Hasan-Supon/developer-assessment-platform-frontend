export type ResultStatus = "PENDING" | "PASSED" | "FAILED";

export interface ResultItem {
  id: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  status: ResultStatus;
  evaluatedAt: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  submissionId: string;
  candidateId: string;
  assessmentId: string;

  assessment: {
    id: string;
    title: string;
    description?: string | null;
    durationMinutes?: number;
    totalMarks?: number;
    passMarks?: number;
  };

  submission: {
    id: string;
    submittedAt: string | null;
    totalMarks: number;
    obtainedMarks: number;
  };
}

export interface CompanyResultsQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CompanyResultsQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CompanyResultItem extends ResultItem {
  candidate: {
    id: string;
    name: string;
    email: string;
  };

  assessment: {
    id: string;
    title: string;
    totalMarks: number;
    passMarks: number;
  };

  submission: {
    id: string;
    submittedAt: string | null;
    totalMarks: number;
    obtainedMarks: number;
  };
}

export interface CompanyResultsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
  totalPage?: number;
}





