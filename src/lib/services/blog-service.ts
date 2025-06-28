'use server';

import { blogPosts as mockBlogPosts } from '@/lib/mock-data';
import type { Subsection } from '@/lib/definitions';

// This is our application-facing type, where id is a string.
// It matches the structure of the mock data but with a string id
// for compatibility with React keys and database IDs.
export type AppBlogPost = {
  id: string;
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
  subsections: {
      title: string;
      description: string;
      image?: string | undefined;
  }[];
};

/**
 * Fetches all blog posts from the mock data.
 * @returns A promise that resolves to an array of blog posts.
 */
export async function getAllBlogPosts(): Promise<AppBlogPost[]> {
    // NOTE: This is using mock data.
    // We convert the numeric ID to a string to ensure type consistency.
    return Promise.resolve(mockBlogPosts.map(post => ({...post, id: post.id.toString()})));
}

/**
 * Fetches a single blog post from the mock data by its slug.
 * @param slug The slug of the blog post to fetch.
 * @returns A promise that resolves to the blog post, or null if not found.
 */
export async function getBlogPostBySlug(slug: string): Promise<AppBlogPost | null> {
    // NOTE: This is using mock data.
    const post = mockBlogPosts.find((p) => p.slug === slug);
    
    if (!post) {
        return null;
    }

    // Convert the numeric ID to a string for consistency.
    return Promise.resolve({...post, id: post.id.toString()});
}
