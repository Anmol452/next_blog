import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogPostBySlug } from "@/lib/services/blog-service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FollowButton } from "@/components/follow-button";
import { Eye, Users } from "lucide-react";
import { CommentsSection } from "@/components/comments-section";
import { BlogActionsMenu } from "@/components/blog-actions-menu";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  const authToken = cookies().get('auth-token')?.value;
  const isAuthenticated = !!authToken;

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-5 w-5" />
                <span>{post.views.toLocaleString()} views</span>
              </div>
              <BlogActionsMenu 
                post={{ title: post.title, slug: post.slug }}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>

          <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-between gap-x-4">
            <div className="flex items-center gap-x-4">
              <Avatar>
                <AvatarImage src={post.authorImage} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-foreground">{post.author}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {post.followers.toLocaleString()} followers
                    </span>
                </div>
              </div>
            </div>
            <FollowButton />
          </div>
        </header>

        <Image
          src={post.postImage}
          alt={post.title}
          width={1200}
          height={600}
          className="w-full rounded-lg shadow-lg mb-8 object-cover max-h-[500px]"
          data-ai-hint="blog banner"
          priority
        />
        
        <div className="my-8 h-40 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
            [ Google Ad Placeholder ]
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.subsections && post.subsections.length > 0 && (
          <div className="mt-12 space-y-12">
            {post.subsections.map((section, index) => (
              <section key={index}>
                <h2 className="text-3xl font-bold font-headline mb-4">{section.title}</h2>
                {section.image && (
                  <Image
                    src={section.image}
                    alt={section.title}
                    width={800}
                    height={400}
                    className="w-full rounded-lg shadow-md my-6 object-cover"
                    data-ai-hint="abstract illustration"
                  />
                )}
                <p className="text-muted-foreground leading-relaxed">{section.description}</p>
              </section>
            ))}
          </div>
        )}

        <div className="my-8 h-40 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
            [ Google Ad Placeholder ]
        </div>

        <CommentsSection />

         <div className="mt-12">
          <h3 className="text-center text-muted-foreground font-semibold mb-4">Sponsored Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-60 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">[ Google Ad Placeholder ]</div>
            <div className="h-60 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">[ Google Ad Placeholder ]</div>
            <div className="h-60 w-full rounded-lg bg-muted flex items-center justify-center text-muted-foreground">[ Google Ad Placeholder ]</div>
          </div>
        </div>
      </article>
    </div>
  );
}
