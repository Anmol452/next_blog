'use server';
/**
 * @fileOverview A flow to generate and "send" a One-Time Password (OTP) for email verification.
 *
 * - sendOtp - A function that simulates sending an OTP to a user's email.
 * - SendOtpInput - The input type for the sendOtp function.
 * - SendOtpOutput - The return type for the sendOtp function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SendOtpInputSchema = z.object({
  email: z.string().email().describe('The email address to send the OTP to.'),
});
export type SendOtpInput = z.infer<typeof SendOtpInputSchema>;

const SendOtpOutputSchema = z.object({
  message: z.string().describe('A confirmation message for the user.'),
  otp: z.string().describe('The 4-digit OTP code. In a real app, this would not be returned.'),
});
export type SendOtpOutput = z.infer<typeof SendOtpOutputSchema>;

export async function sendOtp(input: SendOtpInput): Promise<SendOtpOutput> {
  return sendOtpFlow(input);
}

const sendOtpPrompt = ai.definePrompt({
  name: 'sendOtpPrompt',
  input: {schema: z.object({ email: z.string(), otp: z.string() })},
  output: {schema: z.object({ message: z.string() })},
  prompt: `You are an authentication system. A user with email {{{email}}} has requested an OTP. The code is {{{otp}}}.
      Craft a simple, friendly message confirming that the OTP has been sent. Mention that it's for signing up to CloudBloging.`,
});

const sendOtpFlow = ai.defineFlow(
  {
    name: 'sendOtpFlow',
    inputSchema: SendOtpInputSchema,
    outputSchema: SendOtpOutputSchema,
  },
  async (input) => {
    // In a real application, you would generate a random OTP, store it,
    // and use a service to send an email.
    // For this demo, we'll use a fixed OTP and return it directly.
    const otp = '2233';

    const { output } = await sendOtpPrompt({email: input.email, otp});

    if (!output) {
      throw new Error('AI generation failed or returned an invalid structure.');
    }

    // We append the OTP to the output for testing purposes.
    return {
      message: output.message,
      otp,
    };
  }
);
