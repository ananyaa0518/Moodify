"use client";

import React, { useState, useEffect } from "react";

/**
 * ResourceMatcher Component
 * Displays resources matched to user's current mood/emotional state
 */

export default function ResourceMatcher({ mood, sentiment }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mood) {
      fetchResources();
    }
  }, [mood]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Implement resource fetching
      const response = await fetch(`/api/resources/fetch?mood=${mood}`);

      if (!response.ok) throw new Error("Failed to fetch resources");

      const data = await response.json();
      setResources(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching resources:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (resourceId) => {
    try {
      // TODO: Implement voting logic
      const response = await fetch("/api/resources/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId,
          userId: "current-user-id", // TODO: Get from auth context
          voteType: "up",
        }),
      });

      if (response.ok) {
        // TODO: Update UI to show vote was recorded
      }
    } catch (err) {
      console.error("Error voting on resource:", err);
    }
  };

  if (loading) return <div className="p-4">Loading resources...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="resource-matcher p-4">
      <h2 className="text-2xl font-bold mb-4">Helpful Resources</h2>
      {resources.length === 0 ? (
        <p className="text-gray-600">No resources found for your mood</p>
      ) : (
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource._id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <p className="text-gray-600">{resource.description}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleVote(resource._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Helpful
                </button>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
