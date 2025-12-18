// components/JournalForm.js
"use client";

import { useState } from "react";

export default function JournalForm({ onNewEntry }) {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !username) {
      alert("Please add your name and a few thoughts for today.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/journal/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, text }),
      });

      if (res.ok) {
        setText("");
        setUsername("");
        onNewEntry();
      } else {
        alert("Your entry couldn't be saved. Let's try again in a moment.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. You're not alone—please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-8 rounded-2xl bg-surface shadow-soft border border-border/50 backdrop-blur-sm">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-xl font-semibold text-text mb-1">
          Gentle check-in
        </h2>
        <p className="text-sm text-muted">
          Take a slow breath, then share whatever feels comfortable right now.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="What would you like to be called here?"
          className="w-full rounded-xl border border-border/60 bg-white/80 px-4 py-2.5 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-shadow"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write about how you're feeling, what happened today, or anything you want to let go of."
          className="w-full rounded-xl border border-border/60 bg-white/80 px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-shadow min-h-[140px] leading-relaxed"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center rounded-xl bg-primary text-text-on-primary py-2.5 text-sm font-medium shadow-soft hover:bg-primary-soft hover:shadow-soft-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all"
        >
          {submitting ? "Saving your reflection..." : "Save this moment"}
        </button>
      </form>
    </div>
  );
}
