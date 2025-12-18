# Moodify 🎭

A playful neo-brutalist mood tracker and podcast scrapbook that helps you notice, name, and nurture your feelings.

## Summary

Moodify combines journaling with sentiment analysis to provide personalized mental health resources. Users can track their emotional journey, discover curated content, and explore community-shared podcast recommendations—all in a vibrant, accessible interface.

## Features

- 📝 **Mood Journaling** - Write daily entries with automatic sentiment analysis
- 📊 **Emotional Dashboard** - Visualize mood trends over time with interactive charts
- 🎯 **Smart Resource Matching** - Get articles, videos, and podcasts based on your current mood
- 🎙️ **Community Podcast Scrapbook** - Explore mental health podcasts curated by the community
- 🆘 **Crisis Resources** - Quick access to verified emergency hotlines and support services
- 💬 **Peer Stories** - Read and share anonymous mental health experiences

## Tech Stack

**Frontend:**

- Next.js 14 (App Router), React with Hooks, TailwindCSS (Neo-brutalist design), Chart.js for data visualization

**Backend:**

- Next.js API Routes, MongoDB with Mongoose, VADER Sentiment Analysis

**Scraping & Data:**

- Cheerio for web scraping, Axios for HTTP requests, RSS feed parsing for podcasts

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)

### Installation

1. **Clone the repository**

```bash
   git clone https://github.com/your-username/moodify.git
   cd moodify
```

2. **Install dependencies**

```bash
   npm install
```

3. **Set up environment variables**

```bash
   # Create .env.local file
   MONGODB_URI=mongodb://localhost:27017/moodify
   # or use MongoDB Atlas connection string
```

4. **Run the development server**

```bash
   npm run dev
```

5. **Populate initial data** (one-time setup)

```bash
   # Visit http://localhost:3000 and add this button temporarily to page.js:
   # <button onClick={() => fetch('/api/resources/scrape', {method: 'POST'})}>
   #   Scrape Resources
   # </button>
```

6. **Open your browser**

```
   http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes (journal, resources, stories, emergency)
│   ├── components/       # React components (forms, dashboards, panels)
│   ├── globals.css       # Tailwind + Neo-brutalist styles
│   └── page.js           # Home page
├── lib/
│   ├── scrapers/         # Web scraping (articles, podcasts, videos)
│   ├── utils/            # Helpers (sentiment matching, tagging)
│   └── dbconnect.js      # MongoDB connection
└── models/               # Mongoose schemas (JournalEntry, Resource, etc.)
```

## Usage

1. **Journal** - Write entries, get automatic mood analysis
2. **Dashboard** - View emotional trends over time
3. **Resources** - Discover mood-matched content (articles, videos, podcasts)
4. **Community** - Browse podcast scrapbook and peer stories
5. **Crisis Support** - Access emergency hotlines anytime

## Future Enhancements

- [ ] User authentication and personalized profiles
- [ ] Scheduled scraping with cron jobs for fresh content
- [ ] Therapist/counselor directory integration
- [ ] Mobile app (React Native)
- [ ] Social features (follow friends, share entries)
- [ ] AI chatbot for immediate emotional support
- [ ] Dark mode toggle
- [ ] Multi-language support

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
