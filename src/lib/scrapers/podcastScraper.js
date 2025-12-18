/**
 * Podcast Scraper
 * Extracts metadata and information from podcast URLs and RSS feeds
 */

import { load } from "cheerio";

export class PodcastScraper {
  /**
   * Scrape podcast episode from URL
   * @param {string} url - Podcast URL or RSS feed URL
   * @returns {Promise<Object>} Podcast episode data
   */
  static async scrapePodcast(url) {
    try {
      // Check if URL is an RSS feed
      if (this.isRSSFeed(url)) {
        return this.scrapeRSSFeed(url);
      }

      // Otherwise, try to scrape from podcast platform
      const platform = this.detectPlatform(url);
      return this.scrapePodcastPlatform(url, platform);
    } catch (error) {
      console.error("Error scraping podcast:", error);
      throw error;
    }
  }

  /**
   * Check if URL is RSS feed
   */
  static isRSSFeed(url) {
    return url.includes("feed") || url.includes("rss") || url.endsWith(".xml");
  }

  /**
   * Parse RSS feed
   */
  static async scrapeRSSFeed(feedUrl) {
    try {
      const response = await fetch(feedUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
      }

      const xml = await response.text();
      const $ = load(xml, { xmlMode: true });

      // Extract podcast metadata
      const channel = $("channel");
      const title = channel.find("title").first().text() || "Unknown Podcast";
      const description = channel.find("description").first().text() || "";
      const author =
        channel.find("author").first().text() ||
        channel.find("managingEditor").first().text() ||
        "";
      const imageUrl = channel.find("image > url").first().text() || "";
      const link = channel.find("link").first().text() || feedUrl;

      // Extract episodes
      const episodes = [];
      const items = channel.find("item");

      items.each((index, element) => {
        if (index >= 10) return; // Limit to first 10 episodes

        const episodeTitle = $(element).find("title").first().text() || "";
        const episodeDescription =
          $(element).find("description").first().text() || "";
        const pubDate = $(element).find("pubDate").first().text() || "";
        const enclosureUrl = $(element).find("enclosure").attr("url") || "";
        const duration = $(element).find("duration").first().text() || "";
        const episodeNumber =
          $(element).find("episodeNumber").first().text() || null;
        const season = $(element).find("season").first().text() || null;

        if (episodeTitle || enclosureUrl) {
          episodes.push({
            title: episodeTitle,
            description: episodeDescription,
            duration: this.parseDuration(duration),
            publishDate: pubDate ? new Date(pubDate) : new Date(),
            audioUrl: enclosureUrl,
            episodeNumber: episodeNumber ? parseInt(episodeNumber) : null,
            season: season ? parseInt(season) : null,
          });
        }
      });

      return {
        title,
        description,
        author,
        episodes,
        feedUrl,
        imageUrl,
        link,
        contentType: "podcast",
      };
    } catch (error) {
      console.error("Error parsing RSS feed:", error);
      throw error;
    }
  }

  /**
   * Detect podcast platform
   */
  static detectPlatform(url) {
    if (url.includes("spotify.com")) return "spotify";
    if (url.includes("apple.com/podcast")) return "apple-podcasts";
    if (url.includes("google.com/podcasts")) return "google-podcasts";
    if (url.includes("podbean.com")) return "podbean";
    return "generic";
  }

  /**
   * Scrape podcast from platform
   */
  static async scrapePodcastPlatform(url, platform) {
    return {
      title: "",
      description: "",
      url: url,
      contentType: "podcast",
      platform: platform,
      author: "",
      duration: 0, // In seconds
      uploadDate: null,
      episodeNumber: null,
      season: null,
      thumbnail: "",
    };
  }

  /**
   * Extract episode information
   */
  static parseEpisode(episodeData) {
    return {
      title: episodeData.title || "",
      description: episodeData.description || "",
      duration: this.parseDuration(episodeData.duration) || 0,
      publishDate: new Date(episodeData.pubDate),
      audioUrl: episodeData.enclosure?.url || "",
      episodeNumber: episodeData.episodeNumber || null,
      season: episodeData.season || null,
    };
  }

  /**
   * Parse duration string to seconds
   */
  static parseDuration(durationStr) {
    if (!durationStr) return 0;

    const parts = durationStr.split(":").reverse();
    let seconds = 0;

    if (parts.length >= 1) seconds += parseInt(parts[0]) || 0;
    if (parts.length >= 2) seconds += (parseInt(parts[1]) || 0) * 60;
    if (parts.length >= 3) seconds += (parseInt(parts[2]) || 0) * 3600;

    return seconds;
  }

  /**
   * Format duration to readable format
   */
  static formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  }
}

/**
 * Scrape popular podcasts from multiple RSS feeds
 * @returns {Promise<Array>} Array of scraped podcast resources
 */
export async function scrapePodcasts() {
  const podcastFeeds = [
    "https://feeds.acast.com/public/shows/ted-talks-daily",
    "https://feeds.megaphone.fm/GLT4015192152",
    "https://feeds.gimlet.com/wondery",
    "https://www.allinpodcast.com/feed",
    "https://feeds.acast.com/public/shows/this-american-life",
  ];

  const resources = [];

  for (const feedUrl of podcastFeeds) {
    try {
      const podcastData = await PodcastScraper.scrapePodcast(feedUrl);

      if (
        podcastData &&
        podcastData.episodes &&
        podcastData.episodes.length > 0
      ) {
        // Create a resource for the podcast series
        resources.push({
          title: podcastData.title,
          description: podcastData.description,
          url: podcastData.feedUrl,
          type: "podcast",
          platform: "rss-feed",
          author: podcastData.author,
          imageUrl: podcastData.imageUrl,
          contentType: "podcast",
          isActive: true,
          upvotes: 0,
          downvotes: 0,
          tags: ["mental-health", "podcast", "resources"],
        });

        // Optionally add individual episodes as resources
        // podcastData.episodes.slice(0, 3).forEach((episode) => {
        //   resources.push({
        //     title: `${podcastData.title} - ${episode.title}`,
        //     description: episode.description,
        //     url: episode.audioUrl || podcastData.feedUrl,
        //     type: "podcast-episode",
        //     author: podcastData.author,
        //     contentType: "podcast",
        //     isActive: true,
        //   });
        // });
      }
    } catch (error) {
      console.error(`Failed to scrape podcast feed ${feedUrl}:`, error.message);
      // Continue with next feed on error
    }
  }

  return resources;
}
