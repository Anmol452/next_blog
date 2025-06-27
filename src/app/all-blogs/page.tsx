'use client';

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/lib/mock-data";
import { Search } from "lucide-react";

export default function AllBlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
          Explore All Blogs
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find stories and ideas from our community of writers.
        </p>
      </div>

      <div className="mt-8 mb-12 max-w-lg mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for blogs..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredBlogPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBlogPosts.map((post) => (
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
            <p className="text-muted-foreground">No blogs found for &quot;{searchTerm}&quot;.</p>
        </div>
      )}
    </div>
  );
}
