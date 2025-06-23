import { UploadForm } from './upload-form';

export default function UploadPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl">
            Create a New Post
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Fill in the details below to publish your blog post to the world.
          </p>
        </div>
        <UploadForm />
      </div>
    </div>
  );
}
