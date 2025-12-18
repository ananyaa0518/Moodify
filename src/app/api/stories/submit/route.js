import { NextResponse } from "next/server";
import vader from "vader-sentiment";
import dbConnect from "@/lib/dbconnect";
import PeerStory from "@/models/PeerStory";
import { suggestTagsFromText } from "@/lib/utils/sentimentMatcher";

export async function POST(request) {
  try {
    await dbConnect();

    const { title, story, tags } = await request.json();

    if (!title || !story) {
      return NextResponse.json(
        { error: "Title and story are required" },
        { status: 400 }
      );
    }

    const scores = vader.SentimentIntensityAnalyzer.polarity_scores(story);
    const suggestedTags = suggestTagsFromText(story);

    const newStory = new PeerStory({
      title,
      story,
      tags: tags || suggestedTags,
      sentimentScore: scores.compound,
      isModerated: scores.compound > -0.5, // Auto-approve non-negative stories
    });

    await newStory.save();

    return NextResponse.json(
      { message: "Story submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit story" },
      { status: 500 }
    );
  }
}
