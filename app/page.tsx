import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Dicaso Lab</h1>
      <p className="mt-4 text-lg text-gray-600 sm:text-xl">We build software that matters</p>
      <Link
        href="/contact"
        className="mt-8 rounded text-lg font-medium underline underline-offset-4 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        Contact us
      </Link>
    </main>
  );
}
