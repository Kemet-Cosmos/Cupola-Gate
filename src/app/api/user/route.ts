import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let existingUser = await User.findOne({ clerkId: userId });
    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    const userEmail = user?.emailAddresses[0]?.emailAddress;
    existingUser = await User.findOne({ email: userEmail });

    if (existingUser) {
      existingUser.clerkId = userId;
      await existingUser.save();
      return NextResponse.json(existingUser);
    }

    const newUser = await User.create({
      clerkId: userId,
      email: userEmail,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
