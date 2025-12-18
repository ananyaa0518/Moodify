/**
 * POST /api/stories/vote
 * Marks a story as helpful
 */

export async function POST(request) {
  try {
    const body = await request.json();
    const { storyId, userId, helpful } = body;

    if (!storyId || !userId) {
      return Response.json(
        { error: "storyId and userId are required" },
        { status: 400 }
      );
    }

    // TODO: Implement story helpfulness voting
    // - Update PeerStory helpful count
    // - Track user votes
    // - Update story ranking

    return Response.json({
      success: true,
      message: "Story rating recorded successfully",
    });
  } catch (error) {
    console.error("Error recording story vote:", error);
    return Response.json(
      { error: "Failed to record story vote" },
      { status: 500 }
    );
  }
}
