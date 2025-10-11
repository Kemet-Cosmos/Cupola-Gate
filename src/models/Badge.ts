import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  title: {
    type: String,
    required: true,
    enum: [
      "Welcome",
      "Level_0",
      "Level_1",
      "Level_2",
      "Level_3",
      "Level_4",
      "Chat",
      "Chat_10",
      "NBL",
      "Q_Level_1",
      "Q_Level_2",
      "Q_Level_3",
      "Q_Level_4",
    ],
  },
  createdAt: { type: Date, default: Date.now },
});

export const Badge =
  mongoose.models.Badge || mongoose.model("Badge", badgeSchema);
