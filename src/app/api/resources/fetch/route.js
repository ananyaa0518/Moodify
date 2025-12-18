/**
 * GET /api/resources/fetch
 * Fetches resources matched to user's mood/emotion
 */

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get("mood");
    const category = searchParams.get("category");

    if (!mood) {
      return Response.json(
        { error: "Mood parameter is required" },
        { status: 400 }
      );
    }

    // TODO: Implement resource matching logic
    // - Query Resource collection by mood
    // - Filter by category if provided
    // - Sort by rating/helpful votes
    // - Return matched resources

    return Response.json({
      success: true,
      data: [],
      message: "Resources fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return Response.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
