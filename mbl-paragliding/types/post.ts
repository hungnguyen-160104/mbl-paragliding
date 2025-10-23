// mbl-paragliding/types/post.ts
export type Post = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  content: string;
  tags?: string[];
  language?: string;
  isPublished: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  category?: string;
};

export type Paginated<T> = {
  page: number;
  limit: number;
  total: number;
  items: T[];
};

export type PostPayload = {
  title: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  language?: string;
  isPublished?: boolean;
  category?: string;
};
