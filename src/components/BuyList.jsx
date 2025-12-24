import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { chef } from "../assets/images";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const BuyList = () => {
  const { currentUser } = useAuth();
  const teamId = currentUser?.teamId;

  const [buyList, setBuyList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch BuyList from backend
  const fetchBuyList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/stock/buylist/${teamId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setBuyList(res.data);
    } catch (err) {
      console.error("Error fetching buylist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (teamId) {
      fetchBuyList();
    }
  }, [teamId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between">
        <div className="flex items-center gap-2">
          <img src={chef} alt="logo" className="w-8 h-8" />
          <span className="font-bold text-xl">GruhMate</span>
        </div>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Dashboard
        </Link>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Buy List</h1>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-bold">Items to Buy</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6">Item Name</th>
                  <th className="text-left py-3 px-6">Unit</th>
                  <th className="text-left py-3 px-6">Brand</th>
                  <th className="text-left py-3 px-6">Added On</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500">
                      Loading buy list...
                    </td>
                  </tr>
                ) : buyList.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-6 text-center text-gray-500">
                      No items in BuyList
                    </td>
                  </tr>
                ) : (
                  buyList.map((item) => (
                    <tr key={item._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-6">{item.itemName}</td>
                      <td className="py-3 px-6">{item.unit}</td>
                      <td className="py-3 px-6">{item.brand || "-"}</td>
                      <td className="py-3 px-6">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuyList;
