export type AssessmentStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ONGOING"
  | "COMPLETED"
  | "ARCHIVED";

export interface Assessment {
  id: string;
  title: string;
  description: string | null;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  price: number;
  status: AssessmentStatus;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: AssessmentStatus;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateAssessmentPayload {
  title: string;
  description?: string;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  price: number;
}

// export type CreateAssessmentPayload = {
//   title: string;
//   description: string;
//   durationMinutes: number | undefined;
//   totalMarks: number | undefined;
//   passMarks: number | undefined;
//   price: number | undefined;
// };

export interface UpdateAssessmentPayload {
  title?: string;
  description?: string;
  durationMinutes?: number;
  totalMarks?: number;
  passMarks?: number;
  price?: number;
  status?: AssessmentStatus;
}
