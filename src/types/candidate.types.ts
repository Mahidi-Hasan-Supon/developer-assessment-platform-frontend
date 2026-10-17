export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  role: "CANDIDATE";
}

export interface UpdateCandidateProfilePayload {
  name: string;
}