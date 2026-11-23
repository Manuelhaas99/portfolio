"use server";

import { Resolver } from "node:dns/promises";
import { enquiryTypes, type EnquiryType } from "../data/portfolio";
import { translations } from "../translations";

/**
 * Sends the contact form to your inbox through Resend's REST API.
 *
 * Needs, in `.env.local` locally and in the host's environment variables:
 * - RESEND_API_KEY — from resend.com/api-keys
 * - CONTACT_TO_EMAIL — where the messages land
 * - CONTACT_FROM_EMAIL — optional; defaults to Resend's test sender, which
 *   only delivers to the address the Resend account was created with
 */

export type ContactState = {
  status: "idle" | "sent" | "invalid" | "badEmail" | "failed";
  /** echoed back on error so the form keeps what was typed */
  fields?: { name: string; email: string; enquiry: string; message: string };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Whether the email's domain is set up to receive mail (has MX records).
 * Catches made-up and mistyped domains (`gmial.com`, `asdf.xyz`); it can't
 * tell whether the mailbox itself exists — only a confirmation email can.
 * Fails open: if DNS itself is unreachable, the message still goes through.
 */
async function domainReceivesMail(email: string) {
  const domain = email.slice(email.lastIndexOf("@") + 1);
  // public resolvers, so the check doesn't depend on the host's DNS setup
  const resolver = new Resolver({ timeout: 3000, tries: 2 });
  resolver.setServers(["1.1.1.1", "8.8.8.8"]);
  try {
    const records = await resolver.resolveMx(domain);
    return records.some((r) => r.exchange !== "" && r.exchange !== ".");
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    // no such domain / no mail records / domain's own DNS is broken
    return !["ENOTFOUND", "ENODATA", "ESERVFAIL"].includes(code ?? "");
  }
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const field = (key: string) => String(formData.get(key) ?? "").trim();
  const fields = {
    name: field("name"),
    email: field("email"),
    enquiry: field("enquiry"),
    message: field("message"),
  };

  // honeypot: hidden from people, filled in by bots — pretend it worked
  if (field("company")) return { status: "sent" };

  if (
    !fields.name ||
    fields.name.length > 120 ||
    !EMAIL_RE.test(fields.email) ||
    fields.email.length > 200 ||
    !fields.message ||
    fields.message.length > 5000 ||
    !enquiryTypes.includes(fields.enquiry as EnquiryType)
  ) {
    return { status: "invalid", fields };
  }

  if (!(await domainReceivesMail(fields.email))) {
    return { status: "badEmail", fields };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return { status: "failed", fields };
  }

  const enquiry =
    translations.en.contact.form.enquiryOptions[fields.enquiry as EnquiryType];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      reply_to: fields.email,
      subject: `Portfolio · ${enquiry} · ${fields.name}`,
      text: `${fields.name} <${fields.email}>\n${enquiry}\n\n${fields.message}`,
    }),
  });

  if (!res.ok) {
    console.error("contact form: Resend responded", res.status, await res.text());
    return { status: "failed", fields };
  }

  return { status: "sent" };
}
