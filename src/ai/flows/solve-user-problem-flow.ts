'use server';
/**
 * @fileOverview An AI flow to help users with their problems on the CloudBloging platform.
 *
 * - solveUserProblem - A function that takes a user's problem and returns a solution.
 * - SolveUserProblemInput - The input type for the solveUserProblem function.
 * - SolveUserProblemOutput - The return type for the solveUserProblem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveUserProblemInputSchema = z.object({
  problem: z.string().describe("The user's description of their problem."),
});
export type SolveUserProblemInput = z.infer<typeof SolveUserProblemInputSchema>;

const SolveUserProblemOutputSchema = z.object({
  solution: z.string().describe('A helpful and friendly solution to the user problem.'),
});
export type SolveUserProblemOutput = z.infer<typeof SolveUserProblemOutputSchema>;

export async function solveUserProblem(input: SolveUserProblemInput): Promise<SolveUserProblemOutput> {
  return solveUserProblemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveUserProblemPrompt',
  input: {schema: SolveUserProblemInputSchema},
  output: {schema: SolveUserProblemOutputSchema},
  prompt: `You are an expert AI support assistant for a blogging platform called "CloudBloging".
Your goal is to provide clear, concise, and friendly solutions to user problems.
Be empathetic and guide the user step-by-step if necessary.

User's problem: {{{problem}}}

Provide a helpful solution.
`,
});

const solveUserProblemFlow = ai.defineFlow(
  {
    name: 'solveUserProblemFlow',
    inputSchema: SolveUserProblemInputSchema,
    outputSchema: SolveUserProblemOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
