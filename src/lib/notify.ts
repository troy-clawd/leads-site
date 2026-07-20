// Sends a Telegram notification when a new lead arrives. Reuses the workspace's
// existing Telegram bot: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the
// environment. If either is missing, notification is skipped silently so a
// missing token never blocks a lead from being saved.
type Lead = {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message?: string;
};

export async function notifyNewLead(lead: Lead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    "🔔 *New lead — HomePro*",
    `*Name:* ${lead.name}`,
    `*Phone:* ${lead.phone}`,
    lead.email ? `*Email:* ${lead.email}` : null,
    `*Service:* ${lead.service}`,
    lead.message ? `*Details:* ${lead.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    // Never let a notification failure break lead capture.
    console.error("Telegram notify failed:", err);
  }
}
