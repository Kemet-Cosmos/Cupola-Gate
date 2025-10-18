import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { Badge } from "@/models/Badge";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, fullName } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await connectDB();
    if (!fullName) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const existingBadge = await Badge.findOne({
      clerkId: userId,
      fullName: fullName,
      title,
    });

    if (existingBadge) {
      return NextResponse.json(
        { error: "Badge already exists for this user" },
        { status: 400 }
      );
    }

    const newBadge = await Badge.create({
      clerkId: userId,
      fullName,
      title,
    });

    return NextResponse.json(newBadge, { status: 201 });
  } catch (error) {
    console.error("Error creating badge:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const badges = await Badge.find({ clerkId: userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(badges);
  } catch (error) {
    console.error("Error fetching badges:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { badgeId } = await req.json();

    if (!badgeId) {
      return NextResponse.json(
        { error: "Badge ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const badge = await Badge.findByIdAndDelete(badgeId);

    if (!badge) {
      return NextResponse.json({ error: "Badge not found" }, { status: 404 });
    }

    if (badge.clerkId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to delete this badge" },
        { status: 403 }
      );
    }

    return NextResponse.json({ message: "Badge deleted successfully" });
  } catch (error) {
    console.error("Error deleting badge:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
