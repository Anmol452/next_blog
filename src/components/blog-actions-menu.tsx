'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Bookmark, Flag, Share2, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogActionsMenuProps {
  post: {
    title: string;
    slug: string;
  };
  isAuthenticated: boolean;
}

export function BlogActionsMenu({ post, isAuthenticated }: BlogActionsMenuProps) {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Post unsaved" : "Post saved!",
      description: isSaved ? "Removed from your bookmarks." : "You can find it in your bookmarks.",
    });
  };

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thanks for your feedback. We'll review this post.",
    });
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: `Check out this blog post: ${post.title}`,
      url: `${window.location.origin}/blog/${post.slug}`,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: "Link copied!",
          description: "The post URL has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error("Share failed:", error);
      toast({
        variant: "destructive",
        title: "Sharing failed",
        description: "Could not share the post at this time.",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-5 w-5" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isAuthenticated && (
          <>
            <DropdownMenuItem onSelect={handleSave}>
              {isSaved ? (
                <BookmarkCheck className="mr-2 h-4 w-4" />
              ) : (
                <Bookmark className="mr-2 h-4 w-4" />
              )}
              <span>{isSaved ? "Saved" : "Save"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleReport}>
              <Flag className="mr-2 h-4 w-4" />
              <span>Report</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onSelect={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          <span>Share</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
