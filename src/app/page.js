// app/page.js
"use client";

import { useState, useEffect } from "react";
import JournalForm from "@/app/components/journalForm/journalForm.jsx";
import SentimentDashboard from "@/app/components/sentimentDashboard/sentimentDashboard.jsx";
import ResourceMatcher from "@/app/components/resourceMatcher/resourceMatcher.jsx";
import ScrapingPanel from "@/app/components/admin/ScrapingPanel.jsx";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [latestSentiment, setLatestSentiment] = useState(null);
  const [scraps, setScraps] = useState([]);
  const [scrapsLoading, setScrapsLoading] = useState(true);
  const [scrapsError, setScrapsError] = useState(null);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/journal/entries");
      const data = await res.json();

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

  // Fetch community-scraped podcast resources
  const fetchScraps = async () => {
    try {
      setScrapsLoading(true);
      setScrapsError(null);

      const res = await fetch("/api/resources/podcasts?limit=8");
      if (!res.ok) {
        throw new Error("Failed to load community scraps");
      }
      const data = await res.json();
      setScraps(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading podcast scraps:", error);
      setScrapsError(error.message);
      setScraps([]);
    } finally {
      setScrapsLoading(false);
    }
  };

  useEffect(() => {
    fetchScraps();
  }, []);

  const handleNewEntry = () => {
    fetchEntries();
  };

  const yourLatestScrap =
    scraps.find((s) => s.source === "you") || scraps[0] || null;

  return (
    <main className="px-4 pb-10 pt-6 sm:pt-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* TEMPORARY: Admin scraping panel – remove or move to a dedicated admin route in production */}
        <section className="neo-card bg-neo-yellow/80 px-4 py-4 border-[3px] border-neutral-900">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
            Admin only · data scraping
          </p>
          <ScrapingPanel onScraped={fetchScraps} />
        </section>
        {/* HERO / INTRO */}
        <section
          id="about"
          className="neo-card relative overflow-hidden bg-neo-yellow px-5 py-6 sm:px-8 sm:py-8"
        >
          <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border-[3px] border-neutral-900 bg-neo-cream px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]">
                Mood check · podcast scrapbook
              </p>
              <h1 className="text-3xl font-black leading-tight text-neutral-900 sm:text-4xl md:text-5xl">
                Not sure about your mood?
                <br />
                <span className="bg-neo-pink px-2">Let Moodify help.</span>
              </h1>
              <p className="max-w-xl text-xs text-neutral-800 sm:text-sm">
                Drop a few honest lines, pin podcast moments that hit a nerve,
                and watch your emotional weather turn into a colourful dashboard
                you can actually understand.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#journal"
                  className="neo-pill bg-neo-mint px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-900 transition hover:-translate-y-[2px] hover:shadow-neo-strong"
                >
                  Start Mood Check
                </a>
                <a
                  href="#scrapbook"
                  className="neo-pill bg-neo-lilac px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-900 transition hover:-translate-y-[2px] hover:shadow-neo-strong"
                >
                  View Community Scrapbook
                </a>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className="neo-card w-full max-w-xs rotate-[-2deg] bg-neo-cream px-4 py-4">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700">
                  Today&apos;s mood grid
                </p>
                <div className="grid grid-cols-5 gap-1">
                  {["😊", "😴", "🥲", "🤪", "😌", "😊", "😐", "😤", "😭", "😎"].map(
                    (face, idx) => (
                      <div
                        key={idx}
                        className="flex h-9 items-center justify-center rounded-lg border-[2px] border-neutral-900 bg-neo-page text-base"
                      >
                        {face}
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[10px]">
                  <div className="rounded-xl border-[2px] border-neutral-900 bg-neo-mint px-2 py-1">
                    <p className="font-semibold">Streak</p>
                    <p>7 days</p>
                  </div>
                  <div className="rounded-xl border-[2px] border-neutral-900 bg-neo-pink px-2 py-1">
                    <p className="font-semibold">Avg mood</p>
                    <p>Soft &amp; hopeful</p>
                  </div>
                  <div className="rounded-xl border-[2px] border-neutral-900 bg-neo-lilac px-2 py-1">
                    <p className="font-semibold">Energy</p>
                    <p>63%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TODAY'S MOOD & JOURNAL QUICK ENTRY */}
        <section
          id="journal"
          className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
        >
          <div className="space-y-4">
            <div className="neo-card bg-neo-cream px-4 py-4 sm:px-5 sm:py-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
                    Today&apos;s mood
                  </p>
                  <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                    Hello, how are you feeling today?
                  </h2>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {["Happy", "Angry", "Sleepy", "Anxious", "Bored", "Hopeful"].map(
                  (label) => (
                    <button
                      key={label}
                      type="button"
                      className="neo-pill bg-neo-page px-3 py-1.5 text-[11px] font-semibold text-neutral-900 transition hover:-translate-y-[2px] hover:bg-neo-mint hover:shadow-neo-strong"
                    >
                      {label}
                    </button>
                  ),
                )}
              </div>
              <p className="mb-2 text-[11px] font-medium text-neutral-700">
                Quick journal
              </p>
              <JournalForm onNewEntry={handleNewEntry} />
            </div>

            {!loading && latestSentiment !== null && (
              <div className="neo-card bg-neo-mint px-4 py-4 sm:px-5 sm:py-5">
                <ResourceMatcher sentimentScore={latestSentiment} tags={[]} />
              </div>
            )}
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="neo-card flex items-center gap-3 bg-neo-cream px-4 py-4 text-sm text-neutral-800">
                <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
                Loading your emotional dashboard...
              </div>
            ) : (
              <div className="neo-card bg-neo-cream px-4 py-4 sm:px-5 sm:py-5">
                <SentimentDashboard entries={entries} />
              </div>
            )}
          </div>
        </section>

        {/* COMMUNITY PODCAST SCRAPBOOK */}
        <section
          id="scrapbook"
          className="neo-card bg-neo-pink/90 px-4 py-5 sm:px-6 sm:py-6"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                Community Podcast Scrapbook
              </h2>
              <p className="text-[11px] text-neutral-800 sm:text-xs">
                See interesting podcast moments and reflections shared by other
                Moodify visitors. Scraped by the community, for the community.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px]">
              {["All", "Latest", "Most Loved", "Topic tags"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className="neo-pill bg-neo-cream px-3 py-1 font-semibold transition hover:-translate-y-[2px] hover:bg-neo-mint hover:shadow-neo-strong"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {scrapsLoading ? (
            <div className="neo-card mt-2 bg-neo-cream px-4 py-3 text-[11px] text-neutral-900">
              Loading community scraps...
            </div>
          ) : scrapsError ? (
            <div className="neo-card mt-2 bg-red-100 px-4 py-3 text-[11px] text-red-700">
              {scrapsError}
            </div>
          ) : scraps.length === 0 ? (
            <div className="neo-card mt-2 bg-neo-cream px-4 py-3 text-[11px] text-neutral-900">
              No podcast scraps yet. Once resources are scraped into MongoDB,
              they will appear here for everyone.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {scraps.map((scrap) => (
                <article
                  key={scrap._id}
                  className="rounded-2xl border-[3px] border-neutral-900 bg-neo-cream px-4 py-3 shadow-neo"
                >
                  <div className="mb-2 flex items-center justify-between gap-2 text-[11px]">
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {scrap.title}
                      </p>
                      <p className="text-neutral-700">
                        {scrap.source || "Podcast"}
                      </p>
                    </div>
                    <span className="rounded-full border-[2px] border-neutral-900 bg-neo-mint px-2 py-0.5 text-[10px] font-semibold">
                      Scrap from the community
                    </span>
                  </div>
                  <p className="mb-2 text-[11px] text-neutral-900">
                    {scrap.description || "A community-scraped podcast resource."}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
                    <div className="flex flex-wrap gap-1">
                      {(scrap.tags || []).slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border-[2px] border-neutral-900 bg-neo-yellow px-2 py-0.5 font-semibold"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="rounded-full border-[2px] border-neutral-900 bg-neo-page px-2 py-0.5 font-semibold">
                      {scrap.upvotes ?? 0} ❤️
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* YOUR LATEST SCRAP + MOOD ANALYTICS */}
        <section
          id="podcasts"
          className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
        >
          <div className="neo-card bg-neo-mint px-4 py-5 sm:px-6 sm:py-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                Your Latest Scrap
              </h2>
              <span className="rounded-full border-[2px] border-neutral-900 bg-neo-pink px-2 py-0.5 text-[10px] font-semibold">
                You
              </span>
            </div>
            {yourLatestScrap ? (
              <>
                <p className="text-[11px] text-neutral-900">
                  <span className="font-semibold">{yourLatestScrap.title}</span>
                  {yourLatestScrap.source ? ` · ${yourLatestScrap.source}` : ""}
                </p>
                <p className="mt-2 text-[11px] text-neutral-900">
                  {yourLatestScrap.description ||
                    "This is the latest podcast resource connected to your experience."}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <div className="flex flex-wrap gap-1">
                    {(yourLatestScrap.tags || []).slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border-[2px] border-neutral-900 bg-neo-cream px-2 py-0.5 font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="neo-pill bg-neutral-900 px-3 py-1 text-[10px] font-semibold text-neo-cream transition hover:-translate-y-[2px] hover:shadow-neo-strong"
                  >
                    Edit / Update scrap
                  </button>
                </div>
              </>
            ) : (
              <p className="text-[11px] text-neutral-900">
                You haven&apos;t pinned a podcast moment yet. After your first
                scrap is saved, it will show up here ready to be updated.
              </p>
            )}
          </div>

          <div className="neo-card bg-neo-lilac px-4 py-5 sm:px-6 sm:py-6">
            <h2 className="mb-3 text-lg font-bold text-neutral-900 sm:text-xl">
              Mood analytics preview
            </h2>
            <div className="grid gap-3 text-[11px] sm:grid-cols-3">
              <div className="rounded-2xl border-[3px] border-neutral-900 bg-neo-cream px-3 py-3">
                <p className="font-semibold">Streak</p>
                <p className="mt-1 text-2xl font-black leading-none">7</p>
                <p className="mt-1 text-neutral-700">days of check-ins</p>
              </div>
              <div className="rounded-2xl border-[3px] border-neutral-900 bg-neo-mint px-3 py-3">
                <p className="font-semibold">Average mood</p>
                <p className="mt-1 text-2xl font-black leading-none">😊</p>
                <p className="mt-1 text-neutral-700">mostly gentle + okay</p>
              </div>
              <div className="rounded-2xl border-[3px] border-neutral-900 bg-neo-pink px-3 py-3">
                <p className="font-semibold">Stress indicator</p>
                <div className="mt-2 h-10 rounded-full border-[3px] border-neutral-900 bg-neo-cream p-1">
                  <div className="h-full w-2/3 rounded-full bg-neutral-900" />
                </div>
                <p className="mt-1 text-neutral-700">hovering but manageable</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

