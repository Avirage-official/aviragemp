export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to ETHOS</h1>
        <p className="text-gray-600 mb-8">Discover your Mythical Code</p>
        <div className="space-x-4">
          <a href="/sign-in" className="px-6 py-3 bg-blue-600 text-white rounded">
            Sign In
          </a>
          <a href="/sign-up" className="px-6 py-3 bg-green-600 text-white rounded">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}