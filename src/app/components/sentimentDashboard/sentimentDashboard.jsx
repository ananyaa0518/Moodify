// components/SentimentDashboard.js
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SentimentDashboard({ entries }) {
  const scores = entries.map((entry) => entry.sentimentScore);
  const labels = entries.map((entry) =>
    entry.date && !isNaN(new Date(entry.date))
      ? new Date(entry.date).toLocaleDateString()
      : "No date"
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Sentiment score",
        data: scores,
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: "#6B9080",
        borderColor: "#6B9080",
        borderWidth: 2,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 260);
          gradient.addColorStop(0, "rgba(164, 195, 178, 0.45)");
          gradient.addColorStop(1, "rgba(246, 255, 248, 0.05)");
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#2F3E46",
        borderColor: "#A4C3B2",
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      y: {
        min: -1,
        max: 1,
        grid: {
          color: "rgba(184, 184, 209, 0.2)",
        },
        ticks: {
          color: "#6B9080",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B9080",
        },
      },
    },
  };

  const latest = scores[scores.length - 1] ?? null;
  const first = scores[0] ?? null;
  const trend =
    latest != null && first != null
      ? latest > first + 0.1
        ? "up"
        : latest < first - 0.1
        ? "down"
        : "steady"
      : "none";

  const encouragement =
    trend === "up"
      ? "You're moving toward brighter moments. Keep noticing what supports you."
      : trend === "down"
      ? "Some days are harder. Reaching out, even here, is an act of care."
      : trend === "steady"
      ? "Steady is still progress. Small check-ins add up over time."
      : "Once you add a few entries, you'll start to see your emotional pattern.";

  return (
    <div className="rounded-2xl bg-surface shadow-soft border border-border/50 p-6 flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-text">
            Your emotional landscape
          </h2>
          <p className="text-sm text-muted">
            Each point is a moment you took to listen to yourself.
          </p>
        </div>
        {latest != null && (
          <div className="px-3 py-1.5 rounded-full bg-primary-soft text-xs font-medium text-text-on-primary">
            Latest score: {latest.toFixed(2)}
          </div>
        )}
      </div>

      <div className="h-64">
        {entries.length > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-muted">
            Add a few journal entries to see how your mood shifts over time.
          </div>
        )}
      </div>

      <p className="text-sm text-muted leading-relaxed">{encouragement}</p>
    </div>
  );
}
