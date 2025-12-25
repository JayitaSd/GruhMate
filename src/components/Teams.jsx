import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Teams = () => {
  const { currentUser } = useAuth();
  const loggedInUserId = currentUser?._id;
  
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [message, setMessage] = useState("");
  const [teams, setTeams] = useState([]);
  const [myTeam, setMyTeam] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUserId) {
      fetchAllTeams();
      fetchMyTeam();
    }
  }, [loggedInUserId]);

  const fetchAllTeams = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/team");
      const data = await res.json();
      if (res.ok) {
        setTeams(data.teams);
      }
    } catch (err) {
      console.error("Error fetching teams:", err);
    }
  };

  const fetchMyTeam = async () => {
    try {
      // ✅ First check if currentUser has a team
      if (!currentUser?.team) {
        setMyTeam(null);
        return;
      }

      // ✅ Fetch team details directly using team ID
      const teamRes = await fetch(`http://localhost:5000/api/team/${currentUser.team}`);
      const teamData = await teamRes.json();
      
      if (teamRes.ok && teamData.team) {
        setMyTeam(teamData.team);
      } else {
        setMyTeam(null);
      }
    } catch (err) {
      console.error("Error fetching my team:", err);
      setMyTeam(null);
    }
  };

  const handleCreateTeam = async () => {
  if (!teamName.trim()) {
    setMessage("Team name is required");
    return;
  }

  if (!loggedInUserId) {
    console.error("❌ No logged in user ID");
    console.log("Current user:", currentUser);
    setMessage("Missing userId. Please log in again.");
    return;
  }

  console.log("📤 Sending create team request");
  console.log("userId:", loggedInUserId);
  console.log("teamName:", teamName);

  setLoading(true);
  try {
    const payload = { userId: loggedInUserId, teamName };
    console.log("Payload:", payload);
    
    const res = await fetch("http://localhost:5000/api/team/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);
    
    if (res.ok) {
      setGeneratedCode(data.teamCode);
      setMessage(`Team "${teamName}" created successfully!`);
      setTeamName("");
      
      // Update currentUser in localStorage
      const updatedUser = { ...currentUser, team: data.team._id };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      fetchMyTeam();
      fetchAllTeams();
    } else {
      console.error("❌ Error response:", data);
      setMessage(data.error || "Failed to create team");
    }
  } catch (err) {
    console.error("💥 Network error:", err);
    setMessage("Server error while creating team");
  } finally {
    setLoading(false);
  }
};


  const handleJoinTeam = async () => {
    if (!teamCode.trim()) {
      setMessage("Team code is required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/team/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: loggedInUserId, teamCode }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTeamCode("");
      } else {
        setMessage(data.error || "Failed to join team");
      }
    } catch (err) {
      setMessage("Server error while joining team");
    } finally {
      setLoading(false);
    }
  };

  const handleViewTeam = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Team Management
        </h1>

        {/* My Team Section */}
        {myTeam && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Team</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-indigo-600">
                  {myTeam.name}
                </h3>
                <p className="text-gray-600">
                  Code: <span className="font-mono font-bold">{myTeam.code}</span>
                </p>
                <p className="text-sm text-gray-500">
                  {myTeam.members?.length || 0} member(s)
                </p>
              </div>
              <button
                onClick={() => handleViewTeam(myTeam._id)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        )}

        {/* Create and Join Team */}
        {!myTeam && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Create Team */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Create Team
              </h2>
              <input
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4"
              />
              <button
                onClick={handleCreateTeam}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Team"}
              </button>
              {generatedCode && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    Share this code:{" "}
                    <span className="font-mono font-bold text-lg">
                      {generatedCode}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Join Team */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Join Team
              </h2>
              <input
                type="text"
                placeholder="Enter team code"
                value={teamCode}
                onChange={(e) => setTeamCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
              />
              <button
                onClick={handleJoinTeam}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? "Joining..." : "Send Join Request"}
              </button>
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-lg mb-6">
            {message}
          </div>
        )}

        {/* All Teams List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            All Teams
          </h2>
          {teams.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No teams available</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <div
                  key={team._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {team.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Admin: {team.admin?.name || 'Unknown'}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    Members: {team.members?.length || 0}
                  </p>
                  <button
                    onClick={() => handleViewTeam(team._id)}
                    className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200 transition text-sm"
                  >
                    View Team
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
