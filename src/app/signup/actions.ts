'use server'

import { sendOtp, SendOtpInput } from '@/ai/flows/send-otp-flow';
import { redirect } from 'next/navigation';

export async function sendOtpAction(email: string): Promise<{ success: boolean, message: string, otp?: string, error?: string }> {
  if (!email) {
    return { success: false, error: 'Email is required.' };
  }
  try {
    const input: SendOtpInput = { email };
    const result = await sendOtp(input);
    return { success: true, message: result.message, otp: result.otp };
  } catch (e) {
    console.error(e);
    return { success: false, error: 'Failed to send OTP. Please try again.' };
  }
}


export async function signupAction(prevState: { error: string } | null, formData: FormData) {
  const name = formData.get('name') as string;
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirm-password') as string;
  const otp = formData.get('otp') as string;

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }
  
  // For demo purposes, we are using a hardcoded OTP.
  // In a real app, you would verify this against a value stored in your database/session.
  if (otp !== '2233') {
      return { error: 'Invalid OTP. Please try again.' };
  }
  
  // Dummy signup logic
  console.log('Signing up user:', { name, username, email });

  // On successful signup, redirect to login page.
  redirect('/login');
}
