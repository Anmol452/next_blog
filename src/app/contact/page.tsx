"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { askAiAssistant } from "./actions";
import { useEffect, useRef } from "react";
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
              <div className="space-y-2">
                <Label htmlFor="problem" className="sr-only">Your Problem</Label>
                <Textarea id="problem" name="problem" placeholder="e.g., How do I change my password?" className="min-h-[150px]" required />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>

        {state?.solution && (
          <Card className="mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span>AI Response</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                  {state.solution}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
