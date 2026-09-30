"use client";

import { useState } from "react";

const topics = ["Order", "Wholesale", "Gifting", "Press", "Other"];

/** Frontend only. ponytail: POST /enquiry once the backend exists; keep the field names. */
export function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(topics[0]);

  if (sent)
    return (
      <div className="tile bg-forest p-10 text-cream">
        <p className="t-h3 font-display">Got it. Delight incoming.</p>
        <p className="mt-2 opacity-75">We reply within two working days, usually faster.</p>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="tile bg-cream-2 p-6 md:p-10"
    >
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Topic">
        {topics.map((t) => (
          <button key={t} type="button" role="radio" aria-checked={topic === t} onClick={() => setTopic(t)} className={`pill border-[1.5px] px-4 py-2 text-sm font-semibold transition-colors ${topic === t ? "border-forest bg-forest text-cream" : "border-forest/20 hover:border-forest"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Name
          <input name="name" required className="field border-forest/30" placeholder="Your name" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          Email
          <input name="email" type="email" required className="field border-forest/30" placeholder="you@somewhere.in" />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold sm:col-span-2">
          Message
          <textarea name="message" required rows={5} className="field rounded-[1.5rem] border-forest/30" placeholder="Tell us what you are after" />
        </label>
      </div>
      <input type="hidden" name="topic" value={topic} />
      <button type="submit" className="pill mt-6 w-full bg-pink py-4 font-semibold text-white transition-colors hover:bg-pink-ink sm:w-auto sm:px-10">
        Send it
      </button>
    </form>
  );
}
