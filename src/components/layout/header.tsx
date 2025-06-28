import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rss } from "lucide-react";
import { UserNav } from "@/components/auth/user-nav";
import { cookies } from "next/headers";
import { DesktopNav, MobileNav } from "./navigation";

export function Header() {
  const authToken = cookies().get('auth-token')?.value;
  const isAuthenticated = !!authToken;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Rss className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Blagnager
            </span>
          </Link>
          <DesktopNav isAuthenticated={isAuthenticated} />
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
              <span className="font-bold font-headline">Blagnager</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <MobileNav isAuthenticated={isAuthenticated} />
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="w-full flex-1 md:w-auto md:flex-none">
            </div>
            {isAuthenticated ? (
              <UserNav />
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}
