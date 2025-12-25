import express from "express";
import Team from "../models/Team.js";
import User from "../models/user.js";
import TeamInvite from "../models/TeamInvite.js";
import { sendWhatsApp } from "../services/whatsappService.js";

const router = express.Router();

// Utility: Generate 6-digit alphanumeric code
const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/* ===========================
   CREATE TEAM
=========================== */
router.post("/create", async (req, res) => {
  try {
    const { userId, teamName } = req.body;

    if (!userId || !teamName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.team) {
      return res.status(400).json({ error: "User already belongs to a team" });
    }

    const code = generateCode();

    const team = new Team({
      name: teamName,
      code,
      members: [user._id] // creator is leader
    });

    await team.save();

    user.team = team._id;
    await user.save();

    res.json({
      message: "Team created successfully",
      teamCode: code
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   JOIN TEAM (REQUEST ONLY)
=========================== */
router.post("/join", async (req, res) => {
  try {
    const { userId, teamCode } = req.body;

    if (!userId || !teamCode) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.team) {
      return res.status(400).json({ error: "User already belongs to a team" });
    }

    const team = await Team.findOne({ code: teamCode }).populate("members");
    if (!team) return res.status(404).json({ error: "Team not found" });

    // Prevent duplicate requests
    const existingInvite = await TeamInvite.findOne({
      teamId: team._id,
      userId
    });

    if (existingInvite) {
      return res.status(400).json({ error: "Join request already sent" });
    }

    await TeamInvite.create({
      teamId: team._id,
      userId
    });

    // Notify leader (first member = leader)
    const leader = team.members[0];
    if (leader?.phone) {
      await sendWhatsApp(
        leader.phone,
        `${user.name} wants to join your team "${team.name}".`
      );
    }

    res.json({ message: "Join request sent to team leader" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   ACCEPT INVITE (LEADER)
=========================== */
router.post("/accept", async (req, res) => {
  try {
    const { inviteId } = req.body;

    if (!inviteId) {
      return res.status(400).json({ error: "Missing inviteId" });
    }

    const invite = await TeamInvite.findById(inviteId);
    if (!invite) return res.status(404).json({ error: "Invite not found" });

    const team = await Team.findById(invite.teamId).populate("members");
    const user = await User.findById(invite.userId);

    if (!team || !user) {
      return res.status(404).json({ error: "Team or user not found" });
    }

    // Add member
    team.members.push(user._id);
    await team.save();

    user.team = team._id;
    await user.save();

    await TeamInvite.findByIdAndDelete(inviteId);

    // Notify all team members
    for (const member of team.members) {
      if (member.phone) {
        await sendWhatsApp(
          member.phone,
          `${user.name} has joined the team "${team.name}".`
        );
      }
    }

    res.json({ message: "Member added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
