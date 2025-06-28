'use client';

import { useState, useEffect, useRef } from "react";
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
import { getAllBlogPosts, type AppBlogPost } from "@/lib/services/blog-service";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AllBlogsPage() {
  const [blogPosts, setBlogPosts] = useState<AppBlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);


  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllBlogPosts();
      setBlogPosts(posts);
    };
    fetchPosts();
  }, []);

  const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))];

  const filteredBlogPosts = blogPosts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const scrollAmount = direction === 'left' ? -200 : 200;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkArrows = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      checkArrows();
      scrollContainer.addEventListener('scroll', checkArrows);
      window.addEventListener('resize', checkArrows);

      const observer = new MutationObserver(checkArrows);
      observer.observe(scrollContainer, { childList: true, subtree: true });

      return () => {
        if(scrollContainer) {
            scrollContainer.removeEventListener('scroll', checkArrows);
        }
        window.removeEventListener('resize', checkArrows);
        observer.disconnect();
      };
    }
  }, [categories]);

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

      <div className="my-8 flex items-center justify-center gap-x-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleScroll('left')}
          className={cn("h-10 w-10 shrink-0 rounded-full", !showLeftArrow && "invisible")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div className="w-full max-w-4xl overflow-hidden">
             <div
                ref={scrollRef}
                className="flex items-center space-x-2 overflow-x-auto pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
             >
                 {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
                <style jsx>{`
                    .overflow-x-auto::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
             </div>
        </div>
       
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleScroll('right')}
          className={cn("h-10 w-10 shrink-0 rounded-full", !showRightArrow && "invisible")}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>


      <div className="mb-12 max-w-lg mx-auto">
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
          {filteredBlogPosts.reduce((acc, post, index) => {
            acc.push(
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
            );

            if ((index + 1) % 10 === 0 && (index + 1) < filteredBlogPosts.length) {
              acc.push(
                <div
                  key={`ad-${index}`}
                  className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 my-4 h-40 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground"
                >
                  [ Google Ad Placeholder ]
                </div>
              );
            }

            return acc;
          }, [] as JSX.Element[])}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-muted-foreground">No blogs found for the selected filters.</p>
        </div>
      )}
    </div>
  );
}
