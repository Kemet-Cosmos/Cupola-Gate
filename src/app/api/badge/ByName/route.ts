import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Badge } from "@/models/Badge";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await connectDB();

    const badge = await Badge.findOne({ clerkId: userId, title });

    return NextResponse.json({ exists: !!badge });
  } catch (error) {
    console.error("Error checking badge:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
