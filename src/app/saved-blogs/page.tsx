'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllBlogPosts, type AppBlogPost } from "@/lib/services/blog-service";

const SAVED_POSTS_KEY = 'blagnager_saved_posts';

export default function SavedBlogsPage() {
  const [savedPosts, setSavedPosts] = useState<AppBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setIsLoading(true);
      const savedSlugs: string[] = JSON.parse(localStorage.getItem(SAVED_POSTS_KEY) || '[]');
      if (savedSlugs.length > 0) {
        const allPosts = await getAllBlogPosts();
        const filteredPosts = allPosts.filter(post => savedSlugs.includes(post.slug));
        setSavedPosts(filteredPosts);
      } else {
        setSavedPosts([]);
      }
      setIsLoading(false);
    };

    fetchSavedPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {isLoading ? (
        <div className="text-center text-muted-foreground">Loading your saved posts...</div>
      ) : savedPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedPosts.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="p-0">
                <Link href={`/blog/${post.slug}`} className="block">
                  <Image
                    src={post.postImage}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="h-48 w-full object-cover"
                    data-ai-hint="technology abstract"
                  />
                </Link>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="text-lg font-bold leading-6 font-headline">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex items-center gap-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-muted-foreground">You haven't saved any blogs yet.</p>
        </div>
      )}
    </div>
  );
}
