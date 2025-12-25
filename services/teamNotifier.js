import Team from "../models/Team.js";
import User from "../models/user.js";
import { sendWhatsApp } from "./whatsappService.js";

export const notifyTeam = async (teamId, message) => {
  const team = await Team.findById(teamId).populate("members");
  if (!team) return;

  for (const member of team.members) {
    if (member.phone) {
      await sendWhatsApp(member.phone, message);
    }
  }
};
