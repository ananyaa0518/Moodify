"use client";

import React, { useState } from "react";

/**
 * StoryForm Component
 * Allows users to submit their own peer story
 */

export default function StoryForm({ onStorySubmitted }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    moodTags: [],
    isAnonymous: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const moodOptions = [
    "Happy",
    "Sad",
    "Anxious",
    "Overwhelmed",
    "Lonely",
    "Hopeful",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMoodToggle = (mood) => {
    setFormData((prev) => ({
      ...prev,
      moodTags: prev.moodTags.includes(mood)
        ? prev.moodTags.filter((m) => m !== mood)
        : [...prev.moodTags, mood],
    }));
  };

  const handleAnonymousToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isAnonymous: !prev.isAnonymous,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // TODO: Implement story submission
      const response = await fetch("/api/stories/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit story");

      setSuccess(true);
      setFormData({
        title: "",
        content: "",
        moodTags: [],
        isAnonymous: true,
      });

      if (onStorySubmitted) onStorySubmitted();

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
      console.error("Error submitting story:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="story-form p-4 border rounded-lg">
      <h3 className="text-xl font-bold mb-4">Share Your Story</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Story submitted successfully!
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2"
          placeholder="Give your story a title"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Your Story</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          className="w-full border rounded px-3 py-2 h-32"
          placeholder="Share your experience..."
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">
          How were you feeling?
        </label>
        <div className="flex flex-wrap gap-2">
          {moodOptions.map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => handleMoodToggle(mood)}
              className={`px-3 py-1 rounded ${
                formData.moodTags.includes(mood)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              disabled={loading}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isAnonymous}
            onChange={handleAnonymousToggle}
            disabled={loading}
          />
          <span className="text-sm">Share anonymously</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Share Story"}
      </button>
    </form>
  );
}
