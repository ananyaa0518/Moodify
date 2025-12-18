import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Resource from "@/models/Resource";
import { matchResourcesToMood } from "@/lib/utils/sentimentMatcher";

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const sentimentScore = parseFloat(searchParams.get('sentiment')) || 0;
    const tags = searchParams.get('tags')?.split(',') || [];

    let query = { isActive: true };
    
    if (tags.length > 0) {
      query.tags = { $in: tags };
    }

    const allResources = await Resource.find(query);
    const matchedResources = matchResourcesToMood(sentimentScore, allResources);

    return NextResponse.json(matchedResources.slice(0, 10), { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
