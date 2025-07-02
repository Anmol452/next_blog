
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { askAiAssistant } from "./actions";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Bot, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Thinking...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Ask AI Assistant
        </>
      )}
    </Button>
  );
}

function AIResponseArea({ solution }: { solution?: string }) {
  const { pending } = useFormStatus();
  const [animatedSolution, setAnimatedSolution] = useState('');

  // Effect for typing animation
  useEffect(() => {
    if (solution) {
      setAnimatedSolution(''); // Reset before starting
      let index = 0;
      const intervalId = setInterval(() => {
        setAnimatedSolution((prev) => prev + solution.charAt(index));
        index++;
        if (index >= solution.length) {
          clearInterval(intervalId);
        }
      }, 15); // Typing speed
      return () => clearInterval(intervalId);
    }
  }, [solution]);

  // Effect to clear previous solution when a new request is pending
  useEffect(() => {
    if (pending) {
      setAnimatedSolution('');
    }
  }, [pending]);

  if (pending) {
    return (
      <Card className="bg-muted/50">
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span>AI is thinking...</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
             <div className="h-4 bg-muted-foreground/10 rounded w-full animate-pulse"></div>
             <div className="h-4 bg-muted-foreground/10 rounded w-5/6 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
             <div className="h-4 bg-muted-foreground/10 rounded w-3/4 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </CardContent>
      </Card>
    );
  }
  
  if (!animatedSolution) {
    return null;
  }

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>AI Response</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div
          className="prose prose-sm dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: animatedSolution }}
        />
      </CardContent>
    </Card>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(askAiAssistant, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
    if (state?.solution) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Bot className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline">AI Support Assistant</CardTitle>
            <CardDescription>
              Have a problem or a question about CloudBloging? Describe it below, and our AI assistant will do its best to help you.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <form ref={formRef} action={formAction} className="space-y-6">
              <AIResponseArea solution={state?.solution} />

              <div className="space-y-2">
                <Label htmlFor="problem" className="sr-only">Your Problem</Label>
                <Textarea id="problem" name="problem" placeholder="e.g., How do I change my password?" className="min-h-[150px]" required />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
