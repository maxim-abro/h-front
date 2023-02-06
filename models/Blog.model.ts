type BlogModel = {
  id: number;
  title: string;
  description: string;
  body?: string;
  date: string;
  preview: string;
  counter: number;
  likes: number;
  author: string;
  lat_title: string;
}

export type { BlogModel };
