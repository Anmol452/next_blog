'use server';

import { solveUserProblem } from '@/ai/flows/solve-user-problem-flow';

interface FormState {
  solution?: string;
  error?: string;
}

export async function askAiAssistant(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const problem = formData.get('problem') as string;

  if (!problem || problem.trim().length < 10) {
    return { error: 'Please describe your problem in at least 10 characters.' };
  }

  try {
    const response = await solveUserProblem({ problem });
    return { solution: response.solution };
  } catch (e) {
    console.error(e);
    return { error: 'Sorry, the AI assistant is currently unavailable. Please try again later.' };
  }
}
