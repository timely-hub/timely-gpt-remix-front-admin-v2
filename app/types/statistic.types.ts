export interface PromptTable {
  promptName: string;
  description?: string;
  category: string;
  view: number;
  request: number;
  createAt: string;
  recentRequestAt: string;
}

export interface UserTable {
  name: string;
  email: string;
  space: string;
  type: string;
  connectCount: number;
  requestCount: number;
  signInAt: string;
}

export interface SpaceTable {
  space: string;
  domain: string;
  memberCount: number;
  promptCount: number;
  totalToken: number;
  totalUseToken: number;
  remainingToken: number;
  user?: string;
  createAt?: string;
  expirationDate?: string;
}
