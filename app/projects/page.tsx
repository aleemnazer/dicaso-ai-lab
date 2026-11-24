import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "./data";

export const metadata: Metadata = {
  title: "Projects | Dicaso Lab",
};

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <Link
          href="/"
          className="rounded text-sm text-gray-600 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">Our Projects</h1>
        <p className="mt-3 text-gray-600">
          A selection of products we have designed and built for our clients.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="flex min-w-0 flex-col rounded-lg border border-gray-200 p-6"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
                {project.category}
              </p>
              <h2 className="mt-2 text-xl font-semibold break-words">
                {project.name}
              </h2>
              <p className="mt-3 text-gray-700 break-words">
                {project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                {project.tech.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
