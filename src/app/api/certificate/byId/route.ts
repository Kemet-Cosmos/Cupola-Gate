import { connectDB } from "@/lib/mongodb";
import { Badge } from "@/models/Badge";
import { NextResponse } from "next/server";
import { certificate } from "@/models/certificate";
import { User } from "@/models/User";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await connectDB();

    const Certificate = await certificate.findOne({ _id: id });
    if (!Certificate) {
      return NextResponse.json(
        { error: "no certificate found" },
        { status: 400 }
      );
    }
    const badges = await Badge.find({ clerkId: Certificate.clerkId });
    // const user = await User.findOne({ clerkId: Certificate.clerkId });

    return NextResponse.json({ Certificate, badges }); //, user
  } catch (error) {
    console.error("Error checking badge:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
