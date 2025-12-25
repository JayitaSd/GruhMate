import express from "express";
import Team from "../models/Team.js";
import User from "../models/user.js";
import TeamInvite from "../models/TeamInvite.js";
import { sendWhatsApp } from "../services/whatsappService.js";

const router = express.Router();

const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

/* ===========================
   CREATE TEAM
   =========================== */
/* ===========================
   CREATE TEAM
   =========================== */
router.post("/create", async (req, res) => {
  try {
    const { userId, teamName } = req.body;
    
    // ✅ Debug logging
    console.log("📥 Create team request received");
    console.log("Request body:", req.body);
    console.log("userId:", userId);
    console.log("teamName:", teamName);
    
    if (!userId || !teamName) {
      console.log("❌ Missing fields - userId:", !!userId, "teamName:", !!teamName);
      return res.status(400).json({ 
        error: "Missing required fields",
        received: { userId: !!userId, teamName: !!teamName }
      });
    }

    console.log("🔍 Looking for user with ID:", userId);
    const user = await User.findById(userId);
    console.log("👤 User found:", user ? user.name : "NOT FOUND");
    
    if (!user) {
      console.log("❌ User not found in database");
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.team) {
      console.log("❌ User already has team:", user.team);
      return res.status(400).json({ error: "User already belongs to a team" });
    }

    const code = generateCode();
    console.log("🎫 Generated team code:", code);
    
    const team = new Team({
      name: teamName,
      code,
      admin: user._id,
      members: [user._id]
    });

    console.log("💾 Saving team...");
    await team.save();
    console.log("✅ Team saved:", team._id);
    
    user.team = team._id;
    await user.save();
    console.log("✅ User updated with team ID");

    res.json({
      message: "Team created successfully",
      teamCode: code,
      team: team
    });
    console.log("✅ Response sent successfully");
  } catch (err) {
    console.error("💥 CREATE TEAM ERROR:", err);
    console.error("Error stack:", err.stack);
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

    const team = await Team.findOne({ code: teamCode }).populate("members admin");
    if (!team) return res.status(404).json({ error: "Team not found" });

    const existingInvite = await TeamInvite.findOne({
      teamId: team._id,
      userId,
      status: "PENDING"
    });
    if (existingInvite) {
      return res.status(400).json({ error: "Join request already sent" });
    }

    const invite = await TeamInvite.create({
      teamId: team._id,
      userId
    });

    const admin = team.admin;
    if (admin?.phone) {
      await sendWhatsApp(
        admin.phone,
        `${user.name} wants to join your team "${team.name}".`
      );
    }

    res.json({ 
      message: "Join request sent to team admin",
      invite: invite
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   ACCEPT INVITE (ADMIN ONLY)
   =========================== */
router.post("/accept", async (req, res) => {
  try {
    const { inviteId, adminId } = req.body;
    if (!inviteId || !adminId) {
      return res.status(400).json({ error: "Missing inviteId or adminId" });
    }

    const invite = await TeamInvite.findById(inviteId);
    if (!invite) return res.status(404).json({ error: "Invite not found" });

    const team = await Team.findById(invite.teamId).populate("members");
    const user = await User.findById(invite.userId);

    if (!team || !user) {
      return res.status(404).json({ error: "Team or user not found" });
    }

    // Verify admin permission
    if (team.admin.toString() !== adminId) {
      return res.status(403).json({ error: "Only team admin can accept requests" });
    }

    // Check if user already in another team
    if (user.team) {
      return res.status(400).json({ error: "User already belongs to a team" });
    }

    team.members.push(user._id);
    await team.save();

    user.team = team._id;
    await user.save();

    invite.status = "ACCEPTED";
    await invite.save();

    // Notify all team members
    for (const member of team.members) {
      if (member.phone) {
        await sendWhatsApp(
          member.phone,
          `${user.name} has joined the team "${team.name}".`
        );
      }
    }

    res.json({ message: "Member added successfully", team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   REJECT INVITE (ADMIN ONLY)
   =========================== */
router.post("/reject", async (req, res) => {
  try {
    const { inviteId, adminId } = req.body;
    if (!inviteId || !adminId) {
      return res.status(400).json({ error: "Missing inviteId or adminId" });
    }

    const invite = await TeamInvite.findById(inviteId);
    if (!invite) return res.status(404).json({ error: "Invite not found" });

    const team = await Team.findById(invite.teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    if (team.admin.toString() !== adminId) {
      return res.status(403).json({ error: "Only team admin can reject requests" });
    }

    invite.status = "REJECTED";
    await invite.save();

    res.json({ message: "Request rejected successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   GET TEAM DETAILS
   =========================== */
/* ===========================
   GET TEAM DETAILS
   =========================== */
router.get("/:teamId", async (req, res) => {
  try {
    let team = await Team.findById(req.params.teamId)
      .populate("members", "name phone")
      .populate("admin", "name phone");
    
    if (!team) return res.status(404).json({ error: "Team not found" });

    // ✅ FIX: Auto-repair teams with missing admin
    if (!team.admin && team.members && team.members.length > 0) {
      console.log("⚠️ Team has no admin, setting first member as admin:", team.name);
      team.admin = team.members[0]._id;
      await team.save();
      
      // Reload with populated admin
      team = await Team.findById(req.params.teamId)
        .populate("members", "name phone")
        .populate("admin", "name phone");
    }

    const pendingInvites = await TeamInvite.find({
      teamId: team._id,
      status: "PENDING"
    }).populate("userId", "name phone");

    res.json({
      team,
      pendingRequests: pendingInvites
    });
  } catch (err) {
    console.error("Get team error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   DELETE TEAM (ADMIN ONLY)
   =========================== */
router.delete("/:teamId", async (req, res) => {
  try {
    const { adminId } = req.body;
    const { teamId } = req.params;

    if (!adminId) {
      return res.status(400).json({ error: "Missing adminId" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Verify admin permission
    if (team.admin.toString() !== adminId) {
      return res.status(403).json({ error: "Only admin can delete the team" });
    }

    // Remove team reference from all members
    await User.updateMany(
      { _id: { $in: team.members } },
      { $set: { team: null } }
    );

    // Delete all pending invites for this team
    await TeamInvite.deleteMany({ teamId: team._id });

    // Delete the team
    await Team.findByIdAndDelete(teamId);

    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    console.error("Delete team error:", err);
    res.status(500).json({ error: err.message });
  }
});


/* ===========================
   GET PENDING REQUESTS (ADMIN)
   =========================== */
router.get("/:teamId/requests", async (req, res) => {
  try {
    const { teamId } = req.params;
    const { adminId } = req.query;

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    if (team.admin.toString() !== adminId) {
      return res.status(403).json({ error: "Only admin can view requests" });
    }

    const requests = await TeamInvite.find({
      teamId,
      status: "PENDING"
    }).populate("userId", "name phone");

    res.json({ requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   LEAVE TEAM (MEMBER)
   =========================== */
router.post("/leave", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const user = await User.findById(userId);
    if (!user || !user.team) {
      return res.status(400).json({ error: "User not in any team" });
    }

    const team = await Team.findById(user.team);
    if (!team) return res.status(404).json({ error: "Team not found" });

    // Admin cannot leave (must transfer or delete team)
    if (team.admin.toString() === userId) {
      return res.status(400).json({ 
        error: "Admin cannot leave. Transfer admin rights first or delete the team" 
      });
    }

    team.members = team.members.filter(m => m.toString() !== userId);
    await team.save();

    user.team = null;
    await user.save();

    res.json({ message: "Successfully left the team" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   REMOVE MEMBER (ADMIN ONLY)
   =========================== */
router.post("/remove", async (req, res) => {
  try {
    const { adminId, memberId, teamId } = req.body;
    if (!adminId || !memberId || !teamId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    if (team.admin.toString() !== adminId) {
      return res.status(403).json({ error: "Only admin can remove members" });
    }

    if (memberId === adminId) {
      return res.status(400).json({ error: "Admin cannot remove themselves" });
    }

    const user = await User.findById(memberId);
    if (!user) return res.status(404).json({ error: "User not found" });

    team.members = team.members.filter(m => m.toString() !== memberId);
    await team.save();

    user.team = null;
    await user.save();

    res.json({ message: "Member removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   GET ALL TEAMS (FOR BROWSING)
   =========================== */
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("admin", "name")
      .populate("members", "name")
      .select("name code admin members createdAt");

    res.json({ teams });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
