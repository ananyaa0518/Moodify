"use client";

import React, { useState, useEffect } from "react";
export default function EmergencyPanel() {
  const [hotlines, setHotlines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHotlines();
  }, []);

  const fetchHotlines = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Implement hotline fetching
      const response = await fetch("/api/emergency/hotlines?country=US");

      if (!response.ok) throw new Error("Failed to fetch hotlines");

      const data = await response.json();
      setHotlines(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching hotlines:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading resources...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="emergency-panel p-6 bg-red-50 border-2 border-red-500 rounded-lg">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Crisis Resources</h2>
      <p className="text-gray-700 mb-4">
        If you're in crisis or having thoughts of self-harm, please reach out to
        one of these resources:
      </p>

      {hotlines.length === 0 ? (
        <div className="space-y-3">
          <div className="p-4 bg-white rounded border border-red-300">
            <h3 className="font-bold text-lg mb-2">
              National Suicide Prevention Lifeline
            </h3>
            <p className="text-2xl font-bold text-red-600 mb-2">988</p>
            <p className="text-gray-600">
              Available 24/7 • Free & Confidential
            </p>
          </div>

          <div className="p-4 bg-white rounded border border-red-300">
            <h3 className="font-bold text-lg mb-2">Crisis Text Line</h3>
            <p className="text-xl font-bold text-red-600 mb-2">
              Text HOME to 741741
            </p>
            <p className="text-gray-600">
              Available 24/7 • Free & Confidential
            </p>
          </div>

          <div className="p-4 bg-white rounded border border-red-300">
            <h3 className="font-bold text-lg mb-2">
              International Association for Suicide Prevention
            </h3>
            <p className="text-gray-600 mb-2">
              https://www.iasp.info/resources/Crisis_Centres/
            </p>
            <p className="text-sm text-gray-600">
              Find helplines in your country
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {hotlines.map((hotline) => (
            <div
              key={hotline._id}
              className="p-4 bg-white rounded border border-red-300"
            >
              <h3 className="font-bold text-lg mb-2">{hotline.name}</h3>
              <p className="text-xl font-bold text-red-600 mb-2">
                {hotline.phone}
              </p>
              {hotline.website && (
                <p className="text-gray-600 mb-2">
                  <a
                    href={hotline.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {hotline.website}
                  </a>
                </p>
              )}
              <p className="text-sm text-gray-600">{hotline.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
