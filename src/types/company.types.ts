export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CompanyApplicationPayload {
  companyName: string;
  description?: string;
  website?: string;
  location?: string;
  industry?: string;
}

export interface CompanyProfile {
  id: string;
  companyName: string | null;
  description: string | null;
  website: string | null;
  location: string | null;
  industry: string | null;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
