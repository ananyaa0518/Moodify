import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Resource from "@/models/Resource";

export async function POST(request) {
  try {
    await dbConnect();
    
    const { resourceId } = await request.json();

    const resource = await Resource.findByIdAndUpdate(
      resourceId,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    return NextResponse.json(resource, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upvote resource" },
      { status: 500 }
    );
  }
}
