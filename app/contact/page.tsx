import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Dicaso Lab",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <Link
          href="/"
          className="rounded text-sm text-gray-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mt-3 text-gray-600">
          Have a project in mind? Send us a message and we&apos;ll get back to you.
        </p>
        <ContactForm />
      </div>
    </main>
  );
}
