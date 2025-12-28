import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { chef } from "../assets/images";
import Footer from "./Footer";
import { useAuth } from "../context/AuthContext";

const StockForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // ✅ FIXED: Use currentUser.team, not teamId
  const teamId = currentUser?.team;

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    requiredQuantity: "",
    unit: "kg",
    consumptionRate: "",
    expiryDate: "",
    brand: "",
  });

  const [errors, setErrors] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  /* ================= OPTIONS ================= */
  const consumptionRateOptions = ["daily", "weekly", "monthly", "rare"];
  const unitOptions = ["kg", "g", "litre", "ml", "piece", "packet", "bottle"];

  /* ================= CALENDAR ================= */
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDate = (date) => {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleDateSelect = (day) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(d);
    setFormData({ ...formData, expiryDate: formatDate(d) });
    setShowCalendar(false);
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Item name required";
    if (!formData.quantity || Number(formData.quantity) <= 0)
      newErrors.quantity = "Valid quantity required";
    if (!formData.requiredQuantity || Number(formData.requiredQuantity) <= 0)
      newErrors.requiredQuantity = "Required quantity needed";
    if (!formData.consumptionRate)
      newErrors.consumptionRate = "Consumption rate required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      // ✅ Check if teamId exists
      if (!teamId) {
        alert("Team not found. Please create or join a team first.");
        navigate("/teams");
        return;
      }

      // 👉 NOTE LOGIC (bananas 2–3 days)
      let note = "";
      if (formData.expiryDate) {
        const today = new Date();
        const exp = new Date(formData.expiryDate);
        const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
        note = `Edible for ${diffDays} day(s)`;
      }

      console.log("Submitting stock:", {
        ...formData,
        teamId,
        userName: currentUser?.name,
      });

      // ✅ FIXED: Added userName for notifications
      await axios.post(
        "http://localhost:5000/api/stock",
        {
          name: formData.name,
          quantity: Number(formData.quantity),
          unit: formData.unit,
          consumptionRate: formData.consumptionRate,
          expiryDate: formData.expiryDate || null,
          brand: formData.brand,
          teamId: teamId,
          userName: currentUser?.name, // ✅ For WhatsApp notifications
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Stock added successfully ✅");
      navigate("/dashboard", { state: { refresh: true } });
    } catch (err) {
      console.error("Stock create error:", err);
      console.error("Error response:", err.response?.data);
      alert(err.response?.data?.message || "Failed to save stock");
    }
  };

  /* ================= JSX ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-white shadow p-4 flex justify-between">
        <div className="flex items-center gap-2">
          <img src={chef} alt="logo" className="w-8 h-8" />
          <span className="font-bold text-xl">GruhMate</span>
        </div>
        <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded">
          Dashboard
        </Link>
      </header> */}

      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Add Stock Item</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-5">
          {/* Item Name */}
          <div>
            <input
              name="name"
              placeholder="Item name (e.g., Rice, Wheat, Sugar)"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Available Quantity */}
          <div>
            <input
              type="number"
              name="quantity"
              placeholder="Available quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              step="0.1"
              min="0"
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
          </div>

          {/* Required Quantity */}
          <div>
            <input
              type="number"
              name="requiredQuantity"
              placeholder="Minimum required quantity"
              value={formData.requiredQuantity}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              step="0.1"
              min="0"
            />
            {errors.requiredQuantity && (
              <p className="text-red-500 text-sm mt-1">{errors.requiredQuantity}</p>
            )}
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              {unitOptions.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ FIXED: Removed duplicate consumptionRate select */}
          {/* Consumption Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumption Rate
            </label>
            <select
              name="consumptionRate"
              value={formData.consumptionRate}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="">Select consumption rate</option>
              {consumptionRateOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errors.consumptionRate && (
              <p className="text-red-500 text-sm mt-1">{errors.consumptionRate}</p>
            )}
          </div>

          {/* Brand (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand (Optional)
            </label>
            <input
              name="brand"
              placeholder="e.g., Tata, Fortune, India Gate"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <p className="text-sm text-gray-500 mt-1">
              Example: bananas → choose 2–3 days from today
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Save Stock
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default StockForm;
