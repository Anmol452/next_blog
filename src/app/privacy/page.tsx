export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-headline tracking-tight text-center sm:text-5xl mb-8">
          Privacy Policy
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to BlogNest. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
          </p>
          <h2>2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use.
          </p>
          <h2>3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <h2>4. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
          <h2>5. How We Keep Your Information Safe</h2>
          <p>
            We aim to protect your personal information through a system of organizational and technical security measures. We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
          </p>
        </div>
      </div>
    </div>
  );
}
