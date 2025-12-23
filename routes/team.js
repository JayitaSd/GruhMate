import express from "express";
import Team from "../models/Team.js";
import User from "../models/user.js";

const router = express.Router();

// Utility: Generate 6-digit alphanumeric code
const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// Create Team
router.post("/create", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { userId, teamName } = req.body;
    if (!userId) { return res.status(400).json({ error: "Missing userId in request body" }); }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.team) {
      return res.status(400).json({ error: "User already belongs to a team" });
    }

    const code = generateCode();
    const team = new Team({ name: teamName, code, members: [user._id] });
    await team.save();

    user.team = team._id;
    await user.save();

    res.json({ message: "Team created successfully", teamCode: code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Join Team
router.post("/join", async (req, res) => {
  try {
    const { userId, teamCode } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.team) {
      return res.status(400).json({ error: "User already belongs to a team" });
    }

    const team = await Team.findOne({ code: teamCode });
    if (!team) return res.status(404).json({ error: "Team not found" });

    team.members.push(user._id);
    // await team.save();
    try { await team.save(); } 
    catch (err) 
    { if (err.code === 11000) 
        { return res.status(400).json({ error: "Team code already exists, try again" }); }
         throw err; 
        }

    user.team = team._id;
    await user.save();

    res.json({ message: `Joined team ${team.name}`, teamId: team._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
