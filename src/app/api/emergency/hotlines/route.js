import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import EmergencyHotline from "@/models/EmergencyHotline";

export async function GET(request) {
  try {
    await dbConnect();

    const hotlines = await EmergencyHotline.find({ isVerified: true });

    return NextResponse.json(hotlines, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hotlines" },
      { status: 500 }
    );
  }
}

// Seed initial data
export async function POST() {
  try {
    await dbConnect();

    const seedData = [
      {
        name: "National Suicide Prevention Lifeline",
        phone: "988",
        country: "USA",
        description: "24/7 crisis support",
        availableHours: "24/7",
        website: "https://988lifeline.org",
        tags: ["suicide", "crisis"],
        isVerified: true,
        lastVerified: new Date(),
      },
      {
        name: "Crisis Text Line",
        phone: "Text HOME to 741741",
        country: "USA",
        description: "Text-based crisis support",
        availableHours: "24/7",
        tags: ["crisis", "text"],
        isVerified: true,
      },
    ];

    for (const hotline of seedData) {
      await EmergencyHotline.findOneAndUpdate(
        { phone: hotline.phone },
        hotline,
        { upsert: true }
      );
    }

    return NextResponse.json({ message: "Hotlines seeded" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
