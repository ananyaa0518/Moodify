"use client";

import { useState, useEffect } from "react";

export default function ResourceMatcher({ sentimentScore, tags }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const tagQuery = tags?.join(",") || "";
      const res = await fetch(
        `/api/resources/fetch?sentiment=${sentimentScore}&tags=${tagQuery}`
      );
      if (!res.ok) throw new Error("Failed to fetch resources");
      const data = await res.json();
      setResources(data);
    } catch (err) {
      console.error("Failed to fetch resources:", err);
      setError("We couldn't load suggestions right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sentimentScore !== null && sentimentScore !== undefined) {
      fetchResources();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentimentScore, Array.isArray(tags) ? tags.join(",") : ""]);

  const handleUpvote = async (resourceId) => {
    try {
      await fetch("/api/resources/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId }),
      });
      fetchResources(); // Refresh
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="mt-6 rounded-2xl bg-surface shadow-soft border border-border/50 p-6 flex items-center gap-3 text-sm text-muted">
        <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-primary/50 border-t-transparent" />
        Gently gathering resources that might support you...
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl bg-surface shadow-soft border border-border/50 p-6">
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-text">
            Supportive matches for this moment
          </h2>
          <p className="text-sm text-muted">
            Articles and videos chosen to meet you where you are.
          </p>
        </div>
      </div>

      {error && (
        <p className="mb-3 text-sm text-negative-soft">
          {error} You can try again in a little while.
        </p>
      )}

      {resources.length === 0 ? (
        <p className="text-sm text-muted">
          No matches yet. As you add more entries, we&apos;ll learn what might
          help most.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {resources.map((resource) => (
            <article
              key={resource._id}
              className="group rounded-2xl border border-border/60 bg-white/80 p-4 shadow-soft-sm hover:shadow-soft-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-base font-semibold text-text line-clamp-2">
                    {resource.title}
                  </h3>
                  {resource.type && (
                    <span className="inline-flex items-center rounded-full bg-primary-soft/70 px-2.5 py-0.5 text-[11px] font-medium text-text-on-primary capitalize">
                      {resource.type}
                    </span>
                  )}
                </div>
                {resource.description && (
                  <p className="text-sm text-muted line-clamp-3 mb-3">
                    {resource.description}
                  </p>
                )}
                {Array.isArray(resource.tags) && resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-chip px-2 py-0.5 text-[11px] font-medium text-text/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between gap-3">
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:text-primary-strong transition-colors"
                >
                  Visit resource →
                </a>
                <button
                  onClick={() => handleUpvote(resource._id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3 py-1 text-xs font-medium text-text hover:bg-primary-soft/80 transition-colors"
                >
                  <span>Helpful</span>
                  <span className="text-[11px] opacity-80">
                    {resource.upvotes ?? 0}
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
