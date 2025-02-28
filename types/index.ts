export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
  category: string;
}

// Add serializable error type to help with error handling
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}