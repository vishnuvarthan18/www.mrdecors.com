"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/business";

const eventTypes = [
  "Wedding",
  "Puberty Function",
  "Birthday",
  "Housewarming",
  "Corporate Event",
  "Custom Fabrication",
  "Other",
];

const fieldClass =
  "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState(eventTypes[0]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi MR Decors, my name is ${name || "[name]"}. I'm enquiring about a ${eventType}. ${message}\n\nContact number: ${phone || "[phone]"}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="eventType" className="block text-sm font-medium text-text mb-2">
          Event Type
        </label>
        <select
          id="eventType"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className={fieldClass}
        >
          {eventTypes.map((type) => (
            <option key={type} value={type} className="bg-bg-elev text-text">
              {type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
          Tell us about your event
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={fieldClass}
        />
      </div>
      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Send via WhatsApp
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </form>
  );
}
