import Link from "next/link";
import {Twitter, Instagram, Facebook} from 'lucide-react'

const footerNavs = [
  { href: "/about", name: "About" },
  { href: "/contact", name: "Contact" },
  { href: "/terms", name: "Terms" },
  { href: "/privacy", name: "Privacy" },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} CloudBloging. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4 sm:text-sm">
            {footerNavs.map((item) => (
              <li key={item.name} className="text-muted-foreground hover:text-foreground transition-colors">
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-center gap-x-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" aria-hidden="true" />
            </Link>
        </div>
      </div>
    </footer>
  );
}
