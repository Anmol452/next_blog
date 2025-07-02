import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-center sm:text-5xl mb-8">
          About CloudBloging
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Our mission is to empower creators by providing a simple, beautiful, and powerful platform to share their voice and monetize their passion.
        </p>
        <Image 
          src="https://placehold.co/1200x500.png" 
          alt="Our team" 
          width={1200} 
          height={500} 
          className="rounded-lg shadow-lg mb-12 object-cover"
          data-ai-hint="team work"
        />
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            CloudBloging was founded on the principle that everyone has a story to tell, and every storyteller deserves the opportunity to be heard and rewarded. In today's digital landscape, we saw a need for a platform that strips away the complexity of building a blog and managing monetization, allowing creators to focus on what they do best: creating.
          </p>
          <p>
            We believe in a fair and transparent ecosystem. That's why we've integrated a straightforward revenue-sharing model with Google AdSense, ensuring that as our platform grows, so do the earnings of our community members. Our user-friendly interface is designed to get you from idea to published post in minutes, with powerful features like AI-powered title suggestions to help your content shine.
          </p>
          <p>
            Whether you're a seasoned writer or just starting, CloudBloging is your nest. A place to nurture your ideas, grow your audience, and build a sustainable creative career. Join us and start your journey today.
          </p>
        </div>
      </div>
    </div>
  );
}
