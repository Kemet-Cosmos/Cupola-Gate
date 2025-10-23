import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  fullName: { type: String, required: true },
  title: {
    type: String,
    required: true,
    enum: ["modern", "classic"],
  },
  startedIn: { type: Date },
  endedIn: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const certificate =
  mongoose.models.certificate ||
  mongoose.model("certificate", certificateSchema);
 