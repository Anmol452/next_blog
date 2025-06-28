'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const comments = [
    {
        author: "Alex Johnson",
        avatar: "https://placehold.co/100x100.png",
        date: "2 days ago",
        text: "This was an incredibly insightful article! The breakdown of React Hooks was clear and concise. Looking forward to more content like this."
    },
    {
        author: "Maria Garcia",
        avatar: "https://placehold.co/100x100.png",
        date: "1 day ago",
        text: "Great post! I especially found the section on the Effect Hook helpful. It clarified a lot of confusion I had."
    }
];

export function CommentsSection() {
    return (
        <Card className="mt-12">
            <CardHeader>
                <CardTitle>Comments ({comments.length})</CardTitle>
                <CardDescription>Join the conversation and share your thoughts.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4 mb-8">
                    <div className="space-y-2">
                         <Label htmlFor="comment" className="sr-only">Your comment</Label>
                         <Textarea id="comment" placeholder="Write a comment..." className="min-h-[100px]" />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Post Comment</Button>
                    </div>
                </form>
                <div className="space-y-6">
                    {comments.map((comment, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={comment.avatar} alt={comment.author} data-ai-hint="user avatar" />
                                <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold">{comment.author}</p>
                                    <p className="text-xs text-muted-foreground">{comment.date}</p>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
