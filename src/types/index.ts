export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt?: string;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  category?: string;
  tags?: string[];
  isPublic?: boolean;
  audioKey?: string;
  hasAudio?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
