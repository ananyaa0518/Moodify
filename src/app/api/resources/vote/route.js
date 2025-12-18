/**
 * POST /api/resources/vote
 * Upvotes/marks resources as helpful
 */

export async function POST(request) {
  try {
    const body = await request.json();
    const { resourceId, userId, voteType } = body;

    if (!resourceId || !userId || !voteType) {
      return Response.json(
        { error: "resourceId, userId, and voteType are required" },
        { status: 400 }
      );
    }

    if (!["up", "down"].includes(voteType)) {
      return Response.json(
        { error: 'voteType must be "up" or "down"' },
        { status: 400 }
      );
    }

    // TODO: Implement voting logic
    // - Update resource helpful count
    // - Track user votes to prevent duplicates
    // - Update resource rating

    return Response.json({
      success: true,
      message: "Vote recorded successfully",
    });
  } catch (error) {
    console.error("Error recording vote:", error);
    return Response.json({ error: "Failed to record vote" }, { status: 500 });
  }
}
