import TestimonialsSection from "./components/testimonials-section";
import ContactSection from "./components/contact-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Dicaso Lab</h1>
      <p className="mt-4 text-lg text-gray-600 sm:text-xl">We build software that matters</p>
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
