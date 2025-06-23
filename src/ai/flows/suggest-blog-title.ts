// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Provides blog title suggestions based on a short description.
 *
 * - suggestBlogTitle - A function that suggests blog titles.
 * - SuggestBlogTitleInput - The input type for the suggestBlogTitle function.
 * - SuggestBlogTitleOutput - The return type for the suggestBlogTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBlogTitleInputSchema = z.object({
  description: z.string().describe('A short description of the blog post.'),
});
export type SuggestBlogTitleInput = z.infer<typeof SuggestBlogTitleInputSchema>;

const SuggestBlogTitleOutputSchema = z.object({
  titles: z.array(z.string()).describe('An array of suggested blog titles.'),
});
export type SuggestBlogTitleOutput = z.infer<typeof SuggestBlogTitleOutputSchema>;

export async function suggestBlogTitle(input: SuggestBlogTitleInput): Promise<SuggestBlogTitleOutput> {
  return suggestBlogTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBlogTitlePrompt',
  input: {schema: SuggestBlogTitleInputSchema},
  output: {schema: SuggestBlogTitleOutputSchema},
  prompt: `You are a blog title generation expert. Given a short description of a blog post, you will generate an array of catchy and engaging titles.

Description: {{{description}}}

Titles:`,
});

const suggestBlogTitleFlow = ai.defineFlow(
  {
    name: 'suggestBlogTitleFlow',
    inputSchema: SuggestBlogTitleInputSchema,
    outputSchema: SuggestBlogTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
