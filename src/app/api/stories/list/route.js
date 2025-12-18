import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import PeerStory from "@/models/PeerStory";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const tags = searchParams.get("tags")?.split(",") || [];

    let query = { isModerated: true };

    if (tags.length > 0) {
      query.tags = { $in: tags };
    }

    const stories = await PeerStory.find(query)
      .sort({ helpfulCount: -1, createdAt: -1 })
      .limit(20);

    return NextResponse.json(stories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 }
    );
  }
}
