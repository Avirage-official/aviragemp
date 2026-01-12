import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <SignIn 
        appearance={{
          baseTheme: undefined,
          elements: {
            rootBox: "mx-auto",
            card: "bg-zinc-900 border border-white/10 shadow-2xl",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-500",
            formFieldInput: "bg-white/5 border-white/20 text-white",
            footerActionLink: "text-blue-400 hover:text-blue-300",
            identityPreviewText: "text-white",
            formFieldLabel: "text-gray-300"
          }
        }}
      />
    </div>
  );
}