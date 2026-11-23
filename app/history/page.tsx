import type { Metadata } from "next";
import Link from "next/link";
import { milestones } from "./data";

export const metadata: Metadata = {
  title: "Our History | Dicaso Lab",
};

export default function HistoryPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="rounded text-sm text-gray-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">Our History</h1>
        <p className="mt-3 text-gray-600">
          From a small idea to a software house building products that matter.
        </p>
        <ol className="mt-10 border-l-2 border-gray-300">
          {milestones.map((milestone) => (
            <li
              key={`${milestone.year}-${milestone.title}`}
              className="relative pb-10 pl-8 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-2 border-white bg-blue-600"
              />
              <p className="text-sm font-bold text-gray-900">
                {milestone.year}
              </p>
              <h2 className="mt-1 text-xl font-semibold">{milestone.title}</h2>
              <p className="mt-2 text-gray-600">{milestone.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
