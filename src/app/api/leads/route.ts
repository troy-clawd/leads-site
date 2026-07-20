import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyNewLead } from "@/lib/notify";

const SERVICES = [
  "Plumbing",
  "Electrical",
  "Carpentry",
  "Painting",
  "HVAC",
  "General Repairs",
];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const service = String(body.service ?? "").trim();
  const message = String(body.message ?? "").trim();

  // Validation
  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!phone || phone.length > 40) {
    return NextResponse.json(
      { error: "A valid phone number is required." },
      { status: 400 },
    );
  }
  if (!SERVICES.includes(service)) {
    return NextResponse.json(
      { error: "Please choose a service." },
      { status: 400 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look right." },
      { status: 400 },
    );
  }

  const lead = { name, phone, email: email || undefined, service, message: message || undefined };

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("leads").insert({
      name,
      phone,
      email: email || null,
      service,
      message: message || null,
      source: "website",
    });
    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Could not save your request. Please try again." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Lead save failed:", err);
    return NextResponse.json(
      { error: "Server not configured yet. Please try again later." },
      { status: 500 },
    );
  }

  // Fire the notification but don't block the response on it.
  await notifyNewLead(lead);

  return NextResponse.json({ ok: true });
}
