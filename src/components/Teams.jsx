// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// const Teams = ({ loggedInUserId }) => {
//   const [teamName, setTeamName] = useState("");
//   const [teamCode, setTeamCode] = useState("");
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [message, setMessage] = useState("");
// // const handleCreateTeam = async () => { if (!teamName.trim()) return; 
//   // Handle team creation
//   const { currentUser } = useAuth();
//   const handleCreateTeam = async () => {
//     if (!teamName.trim()) return;
//     console.log("teams frontend mein hu")
//     console.log(loggedInUserId)
//     console.log(currentUser._id)
//     if (!loggedInUserId) { setMessage("Missing userId. Please log in again."); return; }

//     try {
//       const res = await fetch("http://localhost:5000/api/team/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: loggedInUserId, teamName }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setGeneratedCode(data.teamCode);
//         setMessage(`Team "${teamName}" created successfully!`);
//       } else {
//         setMessage(data.error || "Failed to create team");
//       }
//     } catch (err) {
//       setMessage("Server error while creating team");
//     }
//   };

//   // Handle joining team
//   const handleJoinTeam = async () => {
//     if (!teamCode.trim()) return;

//     try {
//       const res = await fetch("http://localhost:5000/api/team/join", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: loggedInUserId, teamCode }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(data.message);
//       } else {
//         setMessage(data.error || "Failed to join team");
//       }
//     } catch (err) {
//       setMessage("Server error while joining team");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Team Lobby</h1>

//       {/* Create Team Section */}
//       <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mb-8">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Team</h2>
//         <input
//           type="text"
//           placeholder="Enter team name"
//           value={teamName}
//           onChange={(e) => setTeamName(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           onClick={handleCreateTeam}
//           className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//         >
//           Create Team
//         </button>

//         {generatedCode && (
//           <p className="mt-4 text-center text-green-600 font-medium">
//             Share this code: <span className="font-bold">{generatedCode}</span>
//           </p>
//         )}
//       </div>

//       {/* Join Team Section */}
//       <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Join Team</h2>
//         <input
//           type="text"
//           placeholder="Enter team code"
//           value={teamCode}
//           onChange={(e) => setTeamCode(e.target.value)}
//           className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-green-400"
//         />
//         <button
//           onClick={handleJoinTeam}
//           className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//         >
//           Join Team
//         </button>
//       </div>

//       {/* Feedback Message */}
//       {message && (
//         <p className="mt-6 text-center text-blue-700 font-medium">{message}</p>
//       )}
//     </div>
//   );
// };

// export default Teams;
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Teams = () => {
  const { currentUser } = useAuth();   // ✅ get user from context
  const loggedInUserId = currentUser?._id; // ✅ safe access to userId

  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [message, setMessage] = useState("");

  // Handle team creation
  const handleCreateTeam = async () => {
    if (!teamName.trim()) return;
    if (!loggedInUserId) {
      setMessage("Missing userId. Please log in again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/team/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ include token
        },
        body: JSON.stringify({ userId: loggedInUserId, teamName }),
      });

      const data = await res.json();

      if (res.ok) {
        setGeneratedCode(data.teamCode);
        setMessage(`Team "${teamName}" created successfully!`);
      } else {
        setMessage(data.error || "Failed to create team");
      }
    } catch (err) {
      setMessage("Server error while creating team");
    }
  };

  // Handle joining team
  const handleJoinTeam = async () => {
    if (!teamCode.trim()) return;
    if (!loggedInUserId) {
      setMessage("Missing userId. Please log in again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/team/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ include token
        },
        body: JSON.stringify({ userId: loggedInUserId, teamCode }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error || "Failed to join team");
      }
    } catch (err) {
      setMessage("Server error while joining team");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Team Lobby</h1>

      {/* Create Team Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Team</h2>
        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCreateTeam}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Create Team
        </button>

        {generatedCode && (
          <p className="mt-4 text-center text-green-600 font-medium">
            Share this code: <span className="font-bold">{generatedCode}</span>
          </p>
        )}
      </div>

      {/* Join Team Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Join Team</h2>
        <input
          type="text"
          placeholder="Enter team code"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleJoinTeam}
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Join Team
        </button>
      </div>

      {/* Feedback Message */}
      {message && (
        <p className="mt-6 text-center text-blue-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default Teams;
