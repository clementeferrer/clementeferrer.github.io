import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-muted">Page not found</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary-dark hover:shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}
