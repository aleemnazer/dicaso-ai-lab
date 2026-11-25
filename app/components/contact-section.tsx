"use client";

import { useRef, useState, type FormEvent } from "react";

type Field = "name" | "email" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Touched = Partial<Record<Field, boolean>>;

const FIELDS: Field[] = ["name", "email", "message"];
const EMPTY: Values = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: Field, value: string): string | undefined {
  const v = value.trim();
  if (field === "name") {
    if (!v) return "Please enter your name.";
  } else if (field === "email") {
    if (!v) return "Please enter your email.";
    if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
  } else {
    if (!v) return "Please enter a message.";
    if (v.length < 10) return "Message must be at least 10 characters.";
  }
  return undefined;
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
const labelClass = "block text-sm font-medium text-gray-900";
const inputBase = `mt-2 block w-full rounded-md border bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 ${focusRing} focus:border-gray-900`;

function inputClass(invalid: boolean) {
  return `${inputBase} ${invalid ? "border-red-600" : "border-gray-300 hover:border-gray-400"}`;
}

export default function ContactSection() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Touched>({});
  const [sent, setSent] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const refs = { name: nameRef, email: emailRef, message: messageRef };

  function handleChange(field: Field, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Once touched, re-validate live so fixing a field clears its error.
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  }

  function handleBlur(field: Field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};
    for (const field of FIELDS) {
      const err = validateField(field, values[field]);
      if (err) next[field] = err;
    }
    setErrors(next);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = FIELDS.find((f) => next[f]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      return;
    }
    setSent(true);
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setSent(false);
  }

  function fieldProps(field: Field) {
    const error = errors[field];
    return {
      id: `contact-${field}`,
      name: field,
      value: values[field],
      "aria-invalid": error ? (true as const) : undefined,
      "aria-describedby": error ? `contact-${field}-error` : undefined,
      onBlur: () => handleBlur(field),
      className: inputClass(Boolean(error)),
    };
  }

  function errorText(field: Field) {
    const error = errors[field];
    if (!error) return null;
    return (
      <p id={`contact-${field}-error`} className="mt-2 text-sm text-red-600">
        {error}
      </p>
    );
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full px-6 py-16 text-left sm:py-20"
    >
      <div className="mx-auto w-full max-w-3xl">
        <h2 id="contact-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get in touch
        </h2>
        <p className="mt-3 text-gray-600">
          Tell us about your project and we&apos;ll reply within 2 business days.
        </p>

        <div className="mt-10 rounded-lg border border-gray-200 bg-white p-6 sm:p-8">
          {sent ? (
            <div role="status">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold">Thanks, message sent!</h3>
              <p className="mt-2 text-gray-600">
                We&apos;ll get back to you within 2 business days.
              </p>
              <button
                type="button"
                onClick={reset}
                className={`mt-6 rounded-sm text-sm text-gray-600 underline-offset-4 hover:underline ${focusRing}`}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      ref={nameRef}
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      onChange={(e) => handleChange("name", e.target.value)}
                      {...fieldProps("name")}
                    />
                    {errorText("name")}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email
                    </label>
                    <input
                      ref={emailRef}
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      onChange={(e) => handleChange("email", e.target.value)}
                      {...fieldProps("email")}
                    />
                    {errorText("email")}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    ref={messageRef}
                    rows={5}
                    placeholder="What are you building?"
                    onChange={(e) => handleChange("message", e.target.value)}
                    {...fieldProps("message")}
                    className={`${inputClass(Boolean(errors.message))} min-h-32 resize-y`}
                  />
                  {errorText("message")}
                </div>
              </div>
              <button
                type="submit"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 active:bg-gray-800 sm:w-auto ${focusRing}`}
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
