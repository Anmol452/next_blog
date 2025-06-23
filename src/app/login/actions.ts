'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(prevState: { error: string } | null, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Dummy authentication
  if (email === 'user@example.com' && password === 'password') {
    cookies().set('auth-token', 'dummy-auth-token-for-demo', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
    redirect('/my-blogs');
  } else {
    return { error: 'Invalid email or password' };
  }
}
