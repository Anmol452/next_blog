
"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllBlogPosts, type AppBlogPost } from "@/lib/services/blog-service";
import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProfilePage() {
    const [myPosts, setMyPosts] = useState<AppBlogPost[]>([]);
    const [profileImage, setProfileImage] = useState("https://placehold.co/100x100.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const newImageUrl = URL.createObjectURL(file);
            setProfileImage(newImageUrl);
        }
    };

    useEffect(() => {
      const fetchPosts = async () => {
        const allPosts = await getAllBlogPosts();
        setMyPosts(allPosts.filter((post) => post.author === "Jane Doe"));
      };
      fetchPosts();
    }, []);

    // Effect to clean up the object URL to prevent memory leaks
    useEffect(() => {
      const currentUrl = profileImage;
      return () => {
        if (currentUrl.startsWith("blob:")) {
          URL.revokeObjectURL(currentUrl);
        }
      };
    }, [profileImage]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl mb-8 text-center">
          User Profile
        </h1>
        <Card>
          <CardHeader className="flex flex-col items-center text-center">
             <Dialog>
              <DialogTrigger asChild>
                <Avatar className="h-24 w-24 mb-4 cursor-pointer transition-transform hover:scale-110">
                  <AvatarImage src={profileImage} alt="User" data-ai-hint="user avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent className="p-0 bg-transparent border-0 w-auto flex justify-center">
                <Image src={profileImage.includes('placehold.co') ? 'https://placehold.co/400x400.png' : profileImage} alt="User" width={400} height={400} className="rounded-full" data-ai-hint="user avatar" />
              </DialogContent>
            </Dialog>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
            />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>Change Photo</Button>
            <CardTitle className="mt-4">Jane Doe</CardTitle>
            <CardDescription>Joined on {new Date().toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-8 my-6 text-center">
                <div>
                    <p className="text-2xl font-bold">1.2K</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                 <div>
                    <p className="text-2xl font-bold">150</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                </div>
            </div>
            <form className="space-y-6 max-w-md mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Jane Doe" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="janedoe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@example.com" disabled />
              </div>
              <div className="text-center">
                <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12">
            <h2 className="text-3xl font-bold font-headline mb-6">Uploaded Blogs</h2>
            {myPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myPosts.map((post) => (
                        <Card key={post.id} className="overflow-hidden group">
                             <Link href={`/blog/${post.slug}`}>
                                <Image
                                    src={post.postImage}
                                    alt={post.title}
                                    width={400}
                                    height={250}
                                    className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                                />
                            </Link>
                            <CardHeader>
                                <CardTitle className="text-lg leading-snug">
                                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription className="text-xs pt-1">{post.date}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground">No blogs uploaded yet.</p>
            )}
        </div>
      </div>
    </div>
  );
}
