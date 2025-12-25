import mongoose from "mongoose";

const teamInviteSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["PENDING", "ACCEPTED"], default: "PENDING" }
});

export default mongoose.model("TeamInvite", teamInviteSchema);
