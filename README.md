# Mental Health Resource Aggregator

A privacy-first web application that helps people discover relevant mental health resources, peer experiences, and crisis support based on how they’re feeling — without requiring accounts, social graphs, or diagnoses.

This project focuses on **support and guidance**, not clinical assessment.

---

## ✨ Why This Exists

When people feel overwhelmed, they usually don’t know:

- what to search for,
- which resources are trustworthy,
- or where to start.

Most platforms either:

- overwhelm users with generic content, or
- require sign-ups and personal data before offering help.

This app removes that friction by:

- accepting short, natural language check-ins,
- matching them with curated resources,
- surfacing peer stories for reassurance,
- and keeping emergency help accessible at all times.

---

## 🧠 Core Features

### 1. Quick Sentiment Check-In

- Users write 1–3 sentences about how they’re feeling.
- Text is analyzed to understand **emotional intensity and themes**.
- No labels are forced on the user.
- No authentication required.

> The check-in is used only to improve recommendations — not stored by default.

---

### 2. Smart Resource Matching

- Articles, videos, and podcasts are matched using:
  - sentiment range (positive / neutral / negative),
  - extracted keywords (stress, anxiety, burnout, etc.),
  - community upvotes.
- Resources are ranked by **relevance + usefulness**, not popularity alone.

Content is refreshed regularly via automated scraping and curation.

---

### 3. Anonymous Peer Stories

- People can share experiences anonymously.
- Stories are tagged by topic (e.g., stress, recovery, relationships).
- Readers can mark stories as **helpful** or **relatable**.
- No comments, DMs, or social profiles — by design.

This keeps the space supportive without becoming a social network.

---

### 4. Emergency & Crisis Support

- Crisis hotlines are always accessible.
- One-click calling or texting where available.
- Resources are region-aware and regularly verified.
- No login required — ever.

Emergency support is intentionally visible across the app.

---

### 5. Optional History

- Without login: recent interactions stored locally.
- With login (optional future): insights can be saved securely.
- Users can reflect on what helped them in the past.

---

## 🛠️ Tech Stack

**Frontend**

- Next.js (App Router)
- React Client Components
- Tailwind CSS

**Backend**

- Next.js API Routes
- MongoDB + Mongoose
- Sentiment analysis (VADER)

**Data & Automation**

- Web scraping (Cheerio, Axios)
- Curated video and podcast sources
- Scheduled refresh via cron (external / platform-native)

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── journal/
│   │   ├── resources/
│   │   ├── stories/
│   │   └── emergency/
│   ├── components/
│   │   ├── resourceMatcher/
│   │   ├── peerStories/
│   │   ├── emergencyResources/
│   │   └── quickCheckIn/
│   └── page.js
├── lib/
│   ├── scrapers/
│   └── utils/
└── models/
```
