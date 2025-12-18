"use client";

import React, { useState } from "react";

/**
 * QuickCheckIn Component
 * Allows users to quickly log their current mood
 */

export default function QuickCheckIn({ onMoodUpdate }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [loading, setLoading] = useState(false);

  const moods = [
    { id: "happy", label: "Happy", emoji: "😊", color: "bg-yellow-100" },
    { id: "sad", label: "Sad", emoji: "😢", color: "bg-blue-100" },
    { id: "anxious", label: "Anxious", emoji: "😰", color: "bg-orange-100" },
    { id: "angry", label: "Angry", emoji: "😠", color: "bg-red-100" },
    { id: "calm", label: "Calm", emoji: "😌", color: "bg-green-100" },
    { id: "confused", label: "Confused", emoji: "😕", color: "bg-purple-100" },
  ];

  const handleMoodSelect = async (moodId) => {
    try {
      setLoading(true);
      setSelectedMood(moodId);

      // TODO: Submit mood check-in to API
      // - Save to user profile
      // - Create journal entry if needed
      // - Trigger resource recommendations

      if (onMoodUpdate) {
        onMoodUpdate(moodId, intensity);
      }

      // Show success feedback
      setTimeout(() => setLoading(false), 500);
    } catch (err) {
      console.error("Error updating mood:", err);
      setLoading(false);
    }
  };

  return (
    <div className="quick-check-in p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-2">How are you feeling today?</h3>
      <p className="text-gray-600 mb-6">Select your current mood</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodSelect(mood.id)}
            disabled={loading}
            className={`p-4 rounded-lg transition-all ${
              selectedMood === mood.id
                ? "ring-4 ring-blue-500 " + mood.color
                : mood.color + " hover:shadow-lg"
            }`}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <div className="font-semibold text-sm">{mood.label}</div>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Intensity: {intensity}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full"
            disabled={loading}
          />
        </div>
      )}

      {selectedMood && (
        <button
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Check-In"}
        </button>
      )}
    </div>
  );
}
