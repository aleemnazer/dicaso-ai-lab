"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

// PLACEHOLDER content – replace before launch
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Dicaso Lab turned our messy support data into an AI assistant that resolves 60% of tickets on its own.",
    name: "Sara Malik",
    role: "Head of CX",
    company: "Nimbus Retail",
  },
  {
    quote:
      "Their team shipped a working ML prototype in three weeks. Clear communication the whole way.",
    name: "James Carter",
    role: "CTO",
    company: "Fieldline Logistics",
  },
  {
    quote:
      "The document-processing pipeline they built saves our analysts hours every single day.",
    name: "Ayesha Khan",
    role: "Operations Lead",
    company: "Crescent Finance",
  },
  {
    quote:
      "Pragmatic engineers who know when to use AI and when not to. We’d hire them again.",
    name: "Daniel Ruiz",
    role: "Founder",
    company: "Brightpath Health",
  },
];

const AUTO_ADVANCE_MS = 5000;
const SWIPE_THRESHOLD_PX = 40;
const COUNT = TESTIMONIALS.length;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// --- external stores (avoid setState-in-effect for browser state) ---

function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
const getHidden = () => document.hidden;
const getHiddenServer = () => false;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getReducedMotionServer = () => false;

// --- icons ---

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
    </svg>
  );
}

const ARROW_BASE =
  "items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  // Bumped on every manual navigation so the auto-advance timer restarts.
  const [navTick, setNavTick] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusInside, setFocusInside] = useState(false);

  const tabHidden = useSyncExternalStore(subscribeVisibility, getHidden, getHiddenServer);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  const autoPlaying = !hovered && !focusInside && !tabHidden && !reducedMotion;

  useEffect(() => {
    if (!autoPlaying) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % COUNT);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [autoPlaying, navTick]);

  const goTo = useCallback((next: number) => {
    setIndex(((next % COUNT) + COUNT) % COUNT);
    setNavTick((t) => t + 1);
  }, []);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // Keyboard: Left/Right arrows while focus is inside the carousel.
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  const onFocus = () => setFocusInside(true);
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setFocusInside(false);
    }
  };

  // Swipe via pointer events; vertical scroll preserved by touch-pan-y.
  const swipeStartX = useRef<number | null>(null);
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    swipeStartX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const start = swipeStartX.current;
    swipeStartX.current = null;
    if (start === null) return;
    const dx = e.clientX - start;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (dx < 0) goNext();
    else goPrev();
  };
  const onPointerCancel = () => {
    swipeStartX.current = null;
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full px-6 py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <h2
          id="testimonials-heading"
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
        >
          What our clients say
        </h2>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          className="relative mx-auto mt-10 max-w-3xl"
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
        >
          <div className="relative">
            <div
              className="touch-pan-y overflow-hidden"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerCancel}
            >
              <div
                aria-live={autoPlaying ? "off" : "polite"}
                className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {TESTIMONIALS.map((t, i) => {
                  const active = i === index;
                  return (
                    <div
                      key={t.name}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} of ${COUNT}`}
                      aria-hidden={!active}
                      inert={!active}
                      className="w-full shrink-0"
                    >
                      <figure className="flex h-full min-h-[16rem] flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center sm:p-10">
                        <blockquote className="text-base text-gray-700 sm:text-xl">
                          <p>{`“${t.quote}”`}</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center justify-center gap-3">
                          <span
                            aria-hidden="true"
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200 text-base font-semibold text-gray-700"
                          >
                            {initials(t.name)}
                          </span>
                          <span className="text-left">
                            <span className="block text-sm font-semibold text-gray-900">
                              {t.name}
                            </span>
                            <span className="block text-sm text-gray-600">
                              {t.role}, {t.company}
                            </span>
                          </span>
                        </figcaption>
                      </figure>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop arrows: outside the card, vertically centered */}
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={goPrev}
              className={`absolute top-1/2 -left-5 hidden h-10 w-10 -translate-y-1/2 sm:flex ${ARROW_BASE}`}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={goNext}
              className={`absolute top-1/2 -right-5 hidden h-10 w-10 -translate-y-1/2 sm:flex ${ARROW_BASE}`}
            >
              <Chevron direction="right" />
            </button>
          </div>

          {/* Controls row: mobile = prev · dots · next; desktop = dots only */}
          <div className="mt-6 flex items-center justify-between sm:justify-center">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={goPrev}
              className={`flex h-11 w-11 sm:hidden ${ARROW_BASE}`}
            >
              <Chevron direction="left" />
            </button>

            <div className="flex justify-center gap-2">
              {TESTIMONIALS.map((t, i) => {
                const active = i === index;
                return (
                  <button
                    key={t.name}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={active ? "true" : undefined}
                    onClick={() => goTo(i)}
                    className="group flex h-6 min-w-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <span
                      aria-hidden="true"
                      className={`block h-2.5 rounded-full transition-all ${
                        active ? "w-6 bg-gray-900" : "w-2.5 bg-gray-300 group-hover:bg-gray-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next testimonial"
              onClick={goNext}
              className={`flex h-11 w-11 sm:hidden ${ARROW_BASE}`}
            >
              <Chevron direction="right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
