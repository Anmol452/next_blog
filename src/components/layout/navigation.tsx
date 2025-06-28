'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, LayoutGrid, User, Upload, Mail, Bookmark, CircleDollarSign } from 'lucide-react';

const allLinks = [
  { href: '/', label: 'Home', icon: Home, auth: false },
  { href: '/all-blogs', label: 'All Blogs', icon: LayoutGrid, auth: false },
  { href: '/my-blogs', label: 'My Blogs', icon: User, auth: true },
  { href: '/funds', label: 'Funds', icon: CircleDollarSign, auth: true },
  { href: '/saved-blogs', label: 'Saved Blogs', icon: Bookmark, auth: true },
  { href: '/upload', label: 'Upload Blog', icon: Upload, auth: true },
  { href: '/contact', label: 'Contact Us', icon: Mail, auth: false },
];

export function DesktopNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname();
  const navLinks = allLinks.filter(link => !link.auth || isAuthenticated);

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {navLinks.map(({ href, label }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === href ? 'text-primary' : 'text-foreground/60'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname();
  const navLinks = allLinks.filter(link => !link.auth || isAuthenticated);

  return (
    <div className="flex flex-col space-y-3">
      {navLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className={cn(
            'flex items-center hover:text-foreground',
            pathname === href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Link>
      ))}
    </div>
  );
}
