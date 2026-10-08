export type ProblemType = "MCQ" | "WRITTEN" | "CODING";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface ProblemCreator {
  id: string;
  name: string;
  email: string;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  type: ProblemType;
  difficulty: Difficulty;
  marks: number;
  options: unknown;
  answer: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  creator?: ProblemCreator;
}

export interface ProblemQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  type?: ProblemType;
  difficulty?: Difficulty;
  createdBy?: string;
}

export interface CreateProblemPayload {
  title: string;
  description: string;
  type: ProblemType;
  difficulty: Difficulty;
  marks: number;
  options?: unknown;
  answer?: string;
}


export interface UpdateProblemPayload {
  title?: string;
  description?: string;
  type?: ProblemType;
  difficulty?: Difficulty;
  marks?: number;
  options?: unknown;
  answer?: string;
}
