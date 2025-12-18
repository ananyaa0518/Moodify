/**
 * GET /api/stories/list
 * Fetches peer stories (anonymized)
 */

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get("mood");
    const limit = parseInt(searchParams.get("limit")) || 10;
    const page = parseInt(searchParams.get("page")) || 1;

    // TODO: Implement story listing logic
    // - Query PeerStory collection
    // - Filter by mood if provided
    // - Anonymize sensitive data
    // - Sort by helpfulness/recency
    // - Implement pagination

    return Response.json({
      success: true,
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
      },
      message: "Stories fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return Response.json({ error: "Failed to fetch stories" }, { status: 500 });
  }
}
