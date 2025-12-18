"use client";

import { useState } from "react";

export default function ScrapingPanel({ onScraped }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleScrape = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const response = await fetch("/api/resources/scrape", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Scraping failed");
      }

      const data = await response.json();
      setResult(data);

      if (typeof onScraped === "function") {
        onScraped();
      }
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neo-card bg-neo-yellow px-6 py-6">
      <h2 className="text-xl font-bold mb-4">Admin: Scrape Resources</h2>

      <button
        onClick={handleScrape}
        disabled={loading}
        className="neo-pill bg-neutral-900 text-neo-cream px-6 py-3 font-semibold disabled:opacity-50"
      >
        {loading ? "Scraping..." : "Scrape Podcasts & Resources"}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-neo-mint rounded-xl border-3 border-neutral-900">
          <p className="font-semibold">✅ Success!</p>
          <p className="text-sm mt-2">
            Scraped {result.breakdown?.articles || 0} articles,{" "}
            {result.breakdown?.videos || 0} videos, and{" "}
            {result.breakdown?.podcasts || 0} podcasts
          </p>
          <p className="text-xs mt-2 text-neutral-700">
            Total: {result.message}
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded-xl border-3 border-neutral-900">
          <p className="font-semibold text-red-700">❌ Error</p>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
}

