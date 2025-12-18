"use client";

import React, { useState, useEffect } from "react";

/**
 * StoryList Component
 * Displays peer stories (anonymized) based on mood
 */

export default function StoryList({ mood }) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchStories();
  }, [mood, page]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Implement story fetching with pagination
      const response = await fetch(
        `/api/stories/list?mood=${mood}&page=${page}&limit=10`
      );

      if (!response.ok) throw new Error("Failed to fetch stories");

      const data = await response.json();
      setStories(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching stories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpful = async (storyId) => {
    try {
      // TODO: Implement helpful voting
      await fetch("/api/stories/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storyId,
          userId: "current-user-id", // TODO: Get from auth context
          helpful: true,
        }),
      });
    } catch (err) {
      console.error("Error marking story as helpful:", err);
    }
  };

  if (loading) return <div className="p-4">Loading stories...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="story-list p-4">
      <h2 className="text-2xl font-bold mb-4">Peer Stories</h2>
      {stories.length === 0 ? (
        <p className="text-gray-600">No stories found for your mood</p>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story._id} className="border rounded-lg p-4 bg-blue-50">
              <h3 className="text-lg font-semibold">{story.title}</h3>
              <p className="text-gray-700 my-2">{story.content}</p>
              <div className="text-sm text-gray-500 mb-3">
                {story.helpful_count || 0} people found this helpful
              </div>
              <button
                onClick={() => handleHelpful(story._id)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                This Helped Me
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
