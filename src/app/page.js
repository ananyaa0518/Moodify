// app/page.js
"use client";

import { useState, useEffect } from "react";
import JournalForm from "@/app/components/journalForm/journalForm.jsx";
import SentimentDashboard from "@/app/components/sentimentDashboard/sentimentDashboard.jsx";
import ResourceMatcher from "@/app/components/resourceMatcher/resourceMatcher.jsx";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestSentiment, setLatestSentiment] = useState(null);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/journal/entries");
      const data = await res.json();

      // Ensure data is an array
      const entriesData = Array.isArray(data)
        ? data
        : data.entries || data.data || [];
      setEntries(entriesData);

      if (Array.isArray(entriesData) && entriesData.length > 0) {
        const last = entriesData[entriesData.length - 1];
        setLatestSentiment(last.sentimentScore ?? null);
      } else {
        setLatestSentiment(null);
      }
    } catch (error) {
      console.error("Failed to fetch entries:", error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleNewEntry = () => {
    fetchEntries();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background-soft to-background px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 sm:mb-10 text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-primary-soft uppercase mb-2">
            Moodify
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-text mb-3">
            A gentle space to notice how you&apos;re really doing
          </h1>
          <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto">
            Write a few honest lines, watch your emotional patterns unfold, and
            receive calm, supportive resources matched to your mood.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
          <div>
            <JournalForm onNewEntry={handleNewEntry} />
            {!loading && latestSentiment !== null && (
              <ResourceMatcher sentimentScore={latestSentiment} tags={[]} />
            )}
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-2xl bg-surface shadow-soft border border-border/50 p-6 text-sm text-muted flex items-center gap-3">
                <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-primary/50 border-t-transparent" />
                Loading your emotional dashboard...
              </div>
            ) : (
              <SentimentDashboard entries={entries} />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
