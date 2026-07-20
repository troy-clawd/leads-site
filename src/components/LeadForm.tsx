"use client";

import { useState } from "react";

const SERVICES = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "HVAC",
  "General Repairs",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-green-50 p-8 text-center ring-1 ring-green-200">
        <div className="text-4xl">✅</div>
        <h3 className="mt-3 text-xl font-semibold text-green-900">
          Thanks — we&apos;ve got it!
        </h3>
        <p className="mt-2 text-green-800">
          A HomePro specialist will reach out shortly to confirm your quote.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-green-700 underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8"
    >
      <div>
        <h3 className="text-xl font-semibold text-slate-900">
          Get your free quote
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Tell us what you need — we respond within the hour.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Name *</span>
          <input
            name="name"
            required
            maxLength={120}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Jane Homeowner"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Phone *</span>
          <input
            name="phone"
            required
            type="tel"
            maxLength={40}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="(555) 123-4567"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          Email (optional)
        </span>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="jane@example.com"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">Service *</span>
        <select
          name="service"
          required
          defaultValue=""
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="" disabled>
            Choose a service…
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-slate-700">
          What do you need done? (optional)
        </span>
        <textarea
          name="message"
          rows={3}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Leaky faucet in the master bath, plus a running toilet…"
        />
      </label>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request my free quote"}
      </button>
      <p className="text-center text-xs text-slate-400">
        No spam. We only use your info to contact you about your request.
      </p>
    </form>
  );
}
