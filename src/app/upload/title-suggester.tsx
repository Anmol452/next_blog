'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { suggestBlogTitle, SuggestBlogTitleInput } from '@/ai/flows/suggest-blog-title';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface TitleSuggesterProps {
  description: string;
  onSelectTitle: (title: string) => void;
}

export function TitleSuggester({ description, onSelectTitle }: TitleSuggesterProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const getSuggestions = useCallback(async () => {
    // Check for a minimum length for better suggestions
    if (!description.trim() || description.trim().length < 10) {
      setError('Please write a description of at least 10 characters to get title suggestions.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const input: SuggestBlogTitleInput = { description };
      const result = await suggestBlogTitle(input);
      setSuggestions(result.titles);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [description]);

  useEffect(() => {
    if (isOpen) {
      getSuggestions();
    }
  }, [isOpen, getSuggestions]);

  const handleSelect = (title: string) => {
    onSelectTitle(title);
    setIsOpen(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Reset state when opening the dialog
      setError(null);
      setSuggestions([]);
      setIsLoading(true);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" type="button">
          <Sparkles className="mr-2 h-4 w-4" />
          Suggest Titles
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>AI-Powered Title Suggestions</DialogTitle>
          <DialogDescription>
            Based on your blog description, here are a few catchy titles. Click one to use it.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading && (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!isLoading && !error && suggestions.length > 0 && (
            <div className="space-y-2">
              {suggestions.map((title, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => handleSelect(title)}
                >
                  <Wand2 className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                  <span>{title}</span>
                </Button>
              ))}
            </div>
          )}
           {!isLoading && !error && suggestions.length === 0 && (
             <div className="text-center text-muted-foreground py-10">No suggestions available. Try refining your description.</div>
           )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
