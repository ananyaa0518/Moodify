import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Resource from "@/models/Resource";

// GET /api/resources/podcasts
// Returns community-scraped podcast resources for the scrapbook section
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const podcasts = await Resource.find({
      isActive: true,
      type: "podcast",
    })
      .sort({ upvotes: -1, scrapedAt: -1 })
      .limit(limit);

    return NextResponse.json(podcasts, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch podcast resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcast resources" },
      { status: 500 },
    );
  }
}

