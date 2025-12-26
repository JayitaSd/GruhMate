import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";
import { chef } from "../assets/images";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => { 
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [buyList, setBuyList] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ FIXED: Get teamId from currentUser.team
  const teamId = currentUser?.team;

  // Fetch stock from backend
  const fetchStocks = async () => {
    try {
      setLoading(true);
      
      // ✅ Check if user has a team
      if (!teamId) {
        console.log("User has no team assigned");
        setStocks([]);
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/stock/team/${teamId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }
      );
      setStocks(res.data);
    } catch (err) {
      console.error("Error fetching stocks", err);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, [refreshKey, teamId]); // ✅ Added teamId dependency

  useEffect(() => {
    if (location.state?.refresh) {
      setRefreshKey((prev) => prev + 1);
    }
  }, [location.state]);

  // Status logic
  const getStatus = (quantity, requiredQuantity) => {
    if (quantity <= requiredQuantity * 0.3) return "critical";
    if (quantity <= requiredQuantity) return "low";
    return "normal";
  };

  // Dashboard stats
  const dashboardStats = {
    totalItems: stocks.length,
    lowStockCount: stocks.filter(
      (s) => getStatus(s.quantity, s.requiredQuantity) !== "normal"
    ).length,
    expiringSoon: stocks.filter(
      (s) => s.note && s.note.toLowerCase().includes("day")
    ).length,
    monthlySavings: 1250,
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleDecrease = async (id, name) => {
  try {
    const res = await axios.patch(
      `http://localhost:5000/api/stock/${id}/decrement`,
      { userName: currentUser?.name },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    // ✅ Check if item was removed (quantity reached 0)
    if (res.data.remove) {
      setStocks((prev) => prev.filter((s) => s._id !== id));
      alert(res.data.message);
      navigate("/buylist");
    } else {
      const updatedStock = res.data.stock;
      setStocks((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, quantity: updatedStock.quantity } : s
        )
      );
    }
  } catch (err) {
    console.error("Decrease error:", err);
    
    // ✅ Show specific error message
    if (err.response?.status === 400) {
      alert(err.response?.data?.message || "Cannot decrease stock further");
    } else {
      alert("Failed to decrease stock");
    }
  }
};


  const handleIncrease = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/stock/${id}/increment`,
        { userName: currentUser?.name }, // ✅ Send userName for notifications
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      const updatedStock = res.data.stock;
      setStocks((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, quantity: updatedStock.quantity } : s
        )
      );
    } catch (err) {
      console.error("Increase error:", err);
      alert("Failed to increase stock");
    }
  };

  // ✅ Show message if user has no team
  if (!teamId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Team Assigned</h2>
          <p className="text-gray-600 mb-6">You need to create or join a team first</p>
          <Link
            to="/teams"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Teams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img src={chef} alt="GruhMate Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">GruhMate</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link to="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link to="/compare" className="text-gray-700 hover:text-blue-600 font-medium">
                Price Compare
              </Link>
              <Link to="/teams" className="text-gray-700 hover:text-blue-600 font-medium">
                Teams
              </Link>
              <Link to="/stockform" className="text-gray-700 hover:text-blue-600 font-medium">
                Add Stock
              </Link>
              <Link to="/buylist" className="text-gray-700 hover:text-blue-600 font-medium">
                BuyList
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  Welcome, {currentUser?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500">Family Account</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of your kitchen inventory and status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            ["Total Items", dashboardStats.totalItems, "📦"],
            ["Low Stock Items", dashboardStats.lowStockCount, "⚠️"],
            ["Expiring Soon", dashboardStats.expiringSoon, "⏰"],
            ["Monthly Savings", `₹${dashboardStats.monthlySavings}`, "💰"],
          ].map(([title, value, icon], i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">{title}</p>
                  <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <div className="text-2xl">{icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stock Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold">Stock Items</h2>
            <Link
              to="/stockform"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            >
              Add Item
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6">Item Name</th>
                  <th className="text-left py-3 px-6">Min Quantity</th>
                  <th className="text-left py-3 px-6">Available Quantity</th>
                  <th className="text-left py-3 px-6">Inventory Unit</th>
                  <th className="text-left py-3 px-6">Status</th>
                  <th className="text-left py-3 px-6">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-gray-500">
                      Loading stock...
                    </td>
                  </tr>
                ) : stocks.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-6 text-center text-gray-500">
                      No stock items added yet
                    </td>
                  </tr>
                ) : (
                  stocks.map((item) => {
                    const status = getStatus(
                      item.quantity,
                      item.consumptionRate || item.requiredQuantity || 0
                    );

                    return (
                      <tr key={item._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-6">
                          <div className="font-medium">{item.name}</div>
                          {item.brand && (
                            <div className="text-xs text-gray-500">
                              Brand: {item.brand}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-6">
                          {item.consumptionRate || item.requiredQuantity || '-'}
                        </td>
                        <td className="py-3 px-6 font-bold">{item.quantity}</td>
                        <td className="py-3 px-6">{item.unit}</td>
                        <td className="py-3 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              status === "critical"
                                ? "bg-red-100 text-red-800"
                                : status === "low"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-6">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleDecrease(item._id, item.name)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                              -
                            </button>
                            <button 
                              onClick={() => handleIncrease(item._id)}
                              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-gray-50 text-sm text-gray-600">
            Showing {stocks.length} items
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
