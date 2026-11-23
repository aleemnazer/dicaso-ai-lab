import type { Metadata } from "next";
import Link from "next/link";
import { leads } from "./data";

export const metadata: Metadata = {
  title: "Our Leads | Dicaso Lab",
};

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function LeadsPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center px-6 py-12">
      <div className="w-full max-w-4xl">
        <Link
          href="/"
          className="rounded text-sm text-gray-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">Meet Our Leads</h1>
        <p className="mt-3 text-gray-600">
          The people guiding our teams and our clients&apos; projects.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {leads.map((lead) => (
            <article
              key={lead.name}
              className="rounded-lg border border-gray-200 bg-white p-6"
            >
              <div
                aria-hidden="true"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-xl font-semibold text-gray-700"
              >
                {getInitials(lead.name)}
              </div>
              <h2 className="mt-4 text-xl font-semibold">{lead.name}</h2>
              <p className="text-sm text-gray-600">{lead.role}</p>
              <p className="mt-3 text-gray-700">{lead.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
