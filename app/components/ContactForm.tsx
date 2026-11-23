"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "../actions/contact";
import { enquiryTypes } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

const fieldClass =
  "rounded-[14px] border border-line/16 px-4 py-[13px] transition-colors duration-300 focus-within:border-amber";
const captionClass =
  "mb-[5px] font-mono text-[10.5px] tracking-[0.1em] text-fg-60";

const initialState: ContactState = { status: "idle" };

/**
 * Posts to the `sendContact` Server Action. On an error the action echoes the
 * fields back, so they come back as `defaultValue` after React resets the form.
 */
export default function ContactForm() {
  const { t } = useLang();
  const form = t.contact.form;
  const [state, formAction, pending] = useActionState(sendContact, initialState);
  const values = state.fields;

  const feedback = state.status === "idle" ? "" : form[state.status];

  // grid-cols-1 is minmax(0,1fr): without it the inputs' intrinsic width can
  // stretch the form past a narrow screen
  return (
    <form action={formAction} className="grid grid-cols-1 gap-[14px]">
      <div className={fieldClass}>
        <label className={captionClass} htmlFor="contact-name">
          {form.name}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          defaultValue={values?.name}
          placeholder={form.namePlaceholder}
        />
      </div>

      <div className={fieldClass}>
        <label className={captionClass} htmlFor="contact-email">
          {form.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          defaultValue={values?.email}
          placeholder={form.emailPlaceholder}
        />
      </div>

      <div className={fieldClass}>
        <label className={captionClass} htmlFor="contact-enquiry">
          {form.enquiry}
        </label>
        <select
          id="contact-enquiry"
          name="enquiry"
          defaultValue={values?.enquiry ?? enquiryTypes[0]}
        >
          {enquiryTypes.map((type) => (
            <option key={type} value={type}>
              {form.enquiryOptions[type]}
            </option>
          ))}
        </select>
      </div>

      <div className={fieldClass}>
        <label className={captionClass} htmlFor="contact-message">
          {form.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          defaultValue={values?.message}
          placeholder={form.messagePlaceholder}
          className="resize-y"
        />
      </div>

      {/* honeypot — kept off-screen and out of the tab order; bots fill it */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-px opacity-0"
      />

      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer rounded-full border-0 bg-amber p-[15px] font-mono text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-amber-hi disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? form.sending : form.submit}
      </button>

      <p
        aria-live="polite"
        className={`m-0 min-h-[1.5em] font-mono text-[12.5px] ${
          state.status === "sent" ? "text-amber" : "text-fg-70"
        }`}
      >
        {feedback}
      </p>
    </form>
  );
}
