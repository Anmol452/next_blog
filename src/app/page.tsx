import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/services/blog-service';
import { WelcomeDialog } from '@/components/welcome-dialog';

export default async function Home({ searchParams }: { searchParams?: { welcome?: string } }) {
  const blogPosts = await getAllBlogPosts();
  const showWelcome = searchParams?.welcome === 'true';
  
  return (
    <div className="container mx-auto px-4 py-8">
      {showWelcome && <WelcomeDialog show={true} />}
      <section className="text-center my-12">
        <h1 className="text-5xl font-bold font-headline tracking-tight text-foreground sm:text-6xl md:text-7xl">
          Write, Share, <span className="text-primary">Earn.</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          Welcome to Blagnager, the platform where your stories find a home and your voice finds its value. Start blogging for free and monetize your passion.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild size="lg">
            <Link href="/upload">
              Start Writing
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/all-blogs">
              Explore Blogs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <div className="my-12 h-40 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
        [ Google Ad Placeholder ]
      </div>

      <section className="my-12">
        <h2 className="text-3xl font-bold font-headline tracking-tight text-foreground sm:text-4xl mb-8">
          Recent Posts
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(0, 6).map((post) => (
            <Card key={post.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
              <CardHeader className="p-0">
                <Link href={`/blog/${post.slug}`} className="block">
                  <Image
                    src={post.postImage}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="h-56 w-full object-cover"
                    data-ai-hint="technology abstract"
                  />
                </Link>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="text-xl font-bold leading-7 font-headline">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <p className="mt-3 text-base text-muted-foreground line-clamp-3">
                  {post.description}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex items-center gap-x-4">
                  <Avatar>
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-foreground">{post.author}</p>
                    <p className="text-muted-foreground">{post.date}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
