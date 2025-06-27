import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/mock-data";
import { Edit, Trash, PlusCircle } from "lucide-react";

export default function MyBlogsPage() {
  // Filtering for a specific author to simulate a logged-in user
  const myPosts = blogPosts.filter((post) => post.author === "Jane Doe");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row mb-8">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
            My Blogs
          </h1>
          <p className="mt-2 text-muted-foreground">Manage your published posts.</p>
        </div>
        <Button asChild>
          <Link href="/upload">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {myPosts.map((post) => (
          <Card
            key={post.id}
            className="flex flex-col overflow-hidden group"
          >
            <CardHeader className="p-0 relative">
                <Image
                  src={post.postImage}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="h-56 w-full object-cover"
                  data-ai-hint="technology abstract"
                />
                 <div className="absolute inset-0 bg-black/20" />
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <CardTitle className="text-xl font-bold leading-7 font-headline">
                 {post.title}
              </CardTitle>
              <p className="mt-3 text-base text-muted-foreground line-clamp-2">
                {post.description}
              </p>
            </CardContent>
            <div className="p-6 pt-0 flex justify-end gap-2">
               <Button variant="outline" size="sm" asChild>
                 <Link href={`/my-blogs/edit/${post.slug}`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                 </Link>
               </Button>
               <Button variant="destructive" size="sm">
                 <Trash className="mr-2 h-4 w-4" /> Delete
               </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
