export interface BlogPost {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  readingTime: string;
  difficulty: 'Super Easy' | 'Easy' | 'Medium' | 'Hard';
  isPopular?: boolean;
  isOrganic?: boolean;
  author: string;
  date: string;
  description?: string;
  content?: BlogContentBlock[];
}

export type BlogContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string }; 