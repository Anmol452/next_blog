"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rss, Mail, Loader2, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { sendOtpAction, signupAction } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Creating Account..." : "Create an account"}
    </Button>
  );
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formState, formAction] = useFormState(signupAction, null);
  const { toast } = useToast();

  useEffect(() => {
    if (formState?.error) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: formState.error,
      });
    }
  }, [formState, toast]);

  const handleSendCode = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setIsSendingCode(true);
    const result = await sendOtpAction(email);
    if (result.success && result.otp) {
      setOtpMessage(result.message);
      setGeneratedOtp(result.otp);
      setStep(2);
    } else {
      setError(result.error || "An unknown error occurred.");
    }
    setIsSendingCode(false);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Rss className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center font-headline">
            {step === 1 ? "Create your Account" : "Verify your Email"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1
              ? "Join Blagnager to start writing and earning today."
              : "We've sent a code to your email. Please enter it below."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSendingCode}
                />
              </div>
              {error && (
                 <Alert variant="destructive" className="py-2">
                  <AlertDescription className="text-xs">{error}</AlertDescription>
                </Alert>
              )}
              <Button onClick={handleSendCode} disabled={isSendingCode} className="w-full">
                {isSendingCode ? <Loader2 className="animate-spin" /> : <><Mail className="mr-2"/> Send Verification Code</>}
              </Button>
            </div>
          )}

          {step === 2 && (
            <form action={formAction} className="grid gap-4">
                {otpMessage && (
                  <Alert>
                    <AlertTitle>Verification Code Sent!</AlertTitle>
                    <AlertDescription>
                        {otpMessage} For this demo, your code is:{" "}
                        <strong className="text-foreground">{generatedOtp}</strong>
                    </AlertDescription>
                  </Alert>
                )}
              <input type="hidden" name="email" value={email} />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" placeholder="max_robinson" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} required className="pr-10" />
                   <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input id="confirm-password" name="confirm-password" type={showConfirmPassword ? "text" : "password"} required className="pr-10" />
                   <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                    <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>
              </div>
               <div className="grid gap-2">
                <Label htmlFor="otp">Verification Code (OTP)</Label>
                <Input id="otp" name="otp" required placeholder="2233"/>
              </div>
              <SubmitButton />
            </form>
          )}

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
