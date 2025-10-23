import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import { certificate } from "@/models/certificate";
import { Badge } from "@/models/Badge";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const findCertificate = await certificate.findOne({ clerkId: userId });
    if (!findCertificate) {
      return NextResponse.json(
        { error: "no certificate found" },
        { status: 404 }
      );
    }
    return NextResponse.json(findCertificate, { status: 201 });
  } catch (error) {
    console.error("Error get certificate:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { title } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const OldestBadge = await Badge.findOne({ clerkId: userId })
      .sort({ createdAt: 1 })
      .exec();
    const latestBadge = await Badge.findOne({ clerkId: userId }).sort({
      createdAt: -1,
    });

    let existingUser = await User.findOne({ clerkId: userId });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Unauthorized : turn back to dashboard" },
        { status: 401 }
      );
    }
    const isCertificateAvailable = await certificate.findOne({
      clerkId: userId,
    });

    if (isCertificateAvailable) {
      return NextResponse.json(
        { error: "certificate is all ready exist" },
        { status: 401 }
      );
    }
    const newCertificate = await certificate.create({
      clerkId: userId,
      fullName: user.fullName,
      startedIn: OldestBadge.createdAt,
      endedIn: latestBadge.createdAt,
      title,
    });

    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
