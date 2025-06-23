import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, LayoutGrid, User, Upload, Mail, Rss } from "lucide-react";
import { UserNav } from "@/components/auth/user-nav";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/all-blogs", label: "All Blogs", icon: LayoutGrid },
  { href: "/my-blogs", label: "My Blogs", icon: User },
  { href: "/upload", label: "Upload Blog", icon: Upload },
  { href: "/contact", label: "Contact Us", icon: Mail },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Rss className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              BlogNest
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center"
            >
              <Rss className="mr-2 h-5 w-5 text-primary" />
              <span className="font-bold font-headline">BlogNest</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
              {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center text-muted-foreground hover:text-foreground"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
                {/* Search could go here */}
            </div>
            <UserNav />
        </div>
      </div>
    </header>
  );
}
