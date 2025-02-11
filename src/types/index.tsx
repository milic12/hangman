export type QuoteStatus = "pending" | "success" | "error";

export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface UseQuoteReturn {
  quoteData: Quote | undefined;
  status: QuoteStatus;
  error: Error | undefined;
  onResolve: (callback: (data: Quote) => void) => void;
  onReject: (callback: (error: Error) => void) => void;
}
