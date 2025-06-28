
export type Subsection = {
  title: string;
  description: string;
  image?: string;
};

export type BlogPost = {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  postImage: string;
  date: string;
  category: string;
  views: number;
  followers: number;
  content: string;
  subsections: Subsection[];
};
