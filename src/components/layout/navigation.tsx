'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, LayoutGrid, User, Upload, Mail } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/all-blogs', label: 'All Blogs', icon: LayoutGrid },
  { href: '/my-blogs', label: 'My Blogs', icon: User },
  { href: '/upload', label: 'Upload Blog', icon: Upload },
  { href: '/contact', label: 'Contact Us', icon: Mail },
];

export function DesktopNav() {
  const pathname = usePathname();
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

export function MobileNav() {
  const pathname = usePathname();
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
