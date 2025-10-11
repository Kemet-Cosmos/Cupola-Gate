import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { useUser } from "@clerk/nextjs";

export async function POST(req: Request) {
  const { user } = useUser();

  if (!user?.id) return new Response("Unauthorized", { status: 401 });

  await connectDB();
  const SavedUser = await User.findOneAndUpdate(
    { clerkId: user?.id },
    { $setOnInsert: { clerkId: user?.id } },
    { upsert: true, new: true }
  );

  return Response.json(SavedUser);
}
