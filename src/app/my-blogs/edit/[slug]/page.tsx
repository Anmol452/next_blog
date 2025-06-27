import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/mock-data";
import { UploadForm } from "@/app/upload/upload-form";

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }
  
  const postForForm = {
    title: post.title,
    description: post.description,
    category: post.category,
    subsections: post.subsections.map(s => ({ title: s.title, description: s.description })),
    images: [], // File inputs can't be pre-filled
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
            Edit Post
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Make changes to your blog post below.
          </p>
        </div>
        <UploadForm post={postForForm} />
      </div>
    </div>
  );
}
