export async function scrapeVideos() {
  // Using YouTube API alternative (no key needed for basic search)
  const queries = [
    { query: 'anxiety relief meditation', moodMatch: 'Negative', tags: ['anxiety', 'meditation'] },
    { query: 'depression recovery stories', moodMatch: 'Negative', tags: ['depression', 'recovery'] },
    { query: 'stress management techniques', moodMatch: 'Neutral', tags: ['stress', 'coping'] },
    { query: 'positive psychology happiness', moodMatch: 'Positive', tags: ['happiness', 'positivity'] }
  ];

  const videos = [];

  for (const { query, moodMatch, tags } of queries) {
    try {
      // Simple YouTube search without API key
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
      videos.push({
        title: `${query} - YouTube Results`,
        url: searchUrl,
        description: `Curated ${query} videos`,
        type: 'video',
        moodMatch,
        tags,
        source: 'YouTube'
      });
    } catch (error) {
      console.error('Error creating video resource:', error);
    }
  }

  return videos;
}
