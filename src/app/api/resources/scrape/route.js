import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Resource from "@/models/Resource";
import { scrapeArticles } from "@/lib/scrapers/articleScraper";
import { scrapeVideos } from "@/lib/scrapers/videoScraper";
import { scrapePodcasts } from "@/lib/scrapers/podcastScraper";

export async function POST(request) {
  try {
    await dbConnect();

    const articles = await scrapeArticles();
    const videos = await scrapeVideos();
    const podcasts = await scrapePodcasts();
    
    const allResources = [...articles, ...videos, ...podcasts];

    // Upsert resources (update if exists, insert if new)
    for (const resource of allResources) {
      await Resource.findOneAndUpdate(
        { url: resource.url },
        { ...resource, scrapedAt: new Date() },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json(
      { message: `Scraped ${allResources.length} resources`, breakdown: { articles: articles.length, videos: videos.length, podcasts: podcasts.length } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Failed to scrape resources" },
      { status: 500 }
    );
  }
}
