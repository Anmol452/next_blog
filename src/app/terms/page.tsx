export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-center sm:text-5xl mb-8">
          Terms of Service
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>1. Agreement to Terms</h2>
          <p>
            By using our services, you agree to be bound by these Terms. If you don’t agree to be bound by these Terms, do not use the services.
          </p>
          <h2>2. Your Content</h2>
          <p>
            You retain ownership of all intellectual property rights in your content. We do not claim ownership of your content. To provide the service, we require a license to your content to host, display, and distribute it.
          </p>
          <h2>3. Monetization</h2>
          <p>
            Blagnager integrates with third-party advertising services like Google AdSense to display ads on blog posts. By using our service, you agree that we may place such advertising on the service. The revenue generated from these ads will be shared between you and Blagnager according to the policy outlined on our Funds page. We are not responsible for the content of these ads or the practices of third-party advertisers.
          </p>
          <h2>4. Prohibited Conduct</h2>
          <p>
            You agree not to engage in any of the following prohibited activities: copying, distributing, or disclosing any part of the service in any medium; using any automated system to access the service; transmitting spam, chain letters, or other unsolicited email; attempting to interfere with the servers running the service; or uploading invalid data, viruses, worms, or other software agents.
          </p>
          <h2>5. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not to a breach of the Terms.
          </p>
        </div>
      </div>
    </div>
  );
}
