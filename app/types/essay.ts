export interface essay {
  content: string;
  updatedAt?: string;
  view?: number;
}

export interface essayInit {
  content: string;
  code?: string;
  url?: string;
}

export interface essayUpdate {
  content: string;
  newUrl: string;
  code: string;
  newCode: string;
}
