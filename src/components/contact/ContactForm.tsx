"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { isEmailConfigured, sendContactEmail } from "@/lib/email";

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  projectType: "Full-Time Role",
  message: "",
};

const projectTypes = [
  "Full-Time Role",
  "Contract / Freelance",
  "AI / Automation Project",
  "Consulting",
  "Other",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    if (!validate()) return;

    if (!isEmailConfigured()) {
      setStatus("error");
      setErrorMessage(
        "Email isn't configured yet — set the EmailJS environment variables to enable this form."
      );
      return;
    }

    setStatus("loading");
    try {
      await sendContactEmail(values);
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending your message. Please try again.");
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={inputClasses}
          />
        </Field>

        <Field label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company (optional)" htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => updateField("company", e.target.value)}
            className={inputClasses}
          />
        </Field>

        <Field label="Project type" htmlFor="projectType">
          <select
            id="projectType"
            name="projectType"
            value={values.projectType}
            onChange={(e) => updateField("projectType", e.target.value)}
            className={inputClasses}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" htmlFor="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          className={inputClasses}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-all duration-300 hover:shadow-[0_0_0_1px_var(--color-accent),0_8px_30px_var(--glow-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {status === "loading" ? "Sending…" : "Send message"}
        </button>

        <div role="status" aria-live="polite">
          {status === "success" && (
            <p className="flex items-center gap-2 text-sm text-success">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Thanks — I&apos;ll get back to you shortly.
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2 text-sm text-error">
              <TriangleAlert className="h-4 w-4" aria-hidden="true" />
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

const inputClasses =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink-secondary">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
