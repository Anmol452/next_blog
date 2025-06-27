import type { ObjectId } from 'mongodb';

export type Subsection = {
  title: string;
  description: string;
  image?: string;
};

export type BlogPost = {
  _id?: ObjectId;
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
