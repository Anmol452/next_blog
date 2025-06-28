'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from './ui/label';
import { Hand, Gem, ShieldAlert, FileText } from 'lucide-react';
import Link from 'next/link';

interface WelcomeDialogProps {
  show: boolean;
}

const WELCOME_KEY = 'blognest_welcome_accepted';

export function WelcomeDialog({ show }: WelcomeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasAccepted = localStorage.getItem(WELCOME_KEY);
    if (show && !hasAccepted) {
      setIsOpen(true);
    }
  }, [show]);

  const handleContinue = () => {
    if (isAgreed) {
      localStorage.setItem(WELCOME_KEY, 'true');
      setIsOpen(false);
      router.push('/'); // Remove query param from URL
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        // Prevent closing by clicking outside or pressing escape
        if (!open) {
            return;
        }
        setIsOpen(open);
    }}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">Welcome to BlogNest!</DialogTitle>
          <DialogDescription>
            Before you start, please review these key terms.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-4">
            <Hand className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">Your Consent</h4>
              <p className="text-sm text-muted-foreground">You grant us permission to host, display, and distribute the content you create.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Gem className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">Fund Sharing</h4>
              <p className="text-sm text-muted-foreground">You will receive 40% of the ad revenue generated from your blog posts.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <ShieldAlert className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">Copyright Policy</h4>
              <p className="text-sm text-muted-foreground">Uploading content you don't own the rights to is strictly prohibited and will lead to account suspension.</p>
            </div>
          </div>
           <div className="flex items-start gap-4">
            <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold">Full Terms</h4>
              <p className="text-sm text-muted-foreground">
                For complete details, please read our full <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link>.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col gap-4 sm:flex-col sm:space-x-0">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={isAgreed} onCheckedChange={(checked) => setIsAgreed(checked as boolean)} />
            <Label htmlFor="terms" className="text-sm font-normal">
              I have read and agree to the terms and conditions.
            </Label>
          </div>
          <Button type="button" onClick={handleContinue} disabled={!isAgreed} className="w-full">
            Continue to BlogNest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}