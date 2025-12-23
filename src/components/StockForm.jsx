import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { chef } from "../assets/images";
import Footer from "./Footer";

const StockForm = () => {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
  name: "",
  quantity: "",
  requiredQuantity: "",
  unit: "kg",
  consumptionRate: "",  // must exist
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
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleDateSelect = (day) => {
    const d = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
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
      const teamId = localStorage.getItem("teamId");
      if (!teamId) {
        alert("Team not found. Please login again.");
        return;
      }

      // 👉 NOTE LOGIC (bananas 2–3 days)
      let note = "";
      if (formData.expiryDate) {
        const today = new Date();
        const exp = new Date(formData.expiryDate);
        const diffDays = Math.ceil(
          (exp - today) / (1000 * 60 * 60 * 24)
        );
        note = `Edible for ${diffDays} day(s)`;
      }

      
      await axios.post(
  "http://localhost:5000/api/stock",
  {
    name: formData.name,
    quantity: Number(formData.quantity),
    unit: formData.unit,
    consumptionRate: formData.consumptionRate,
    expiryDate: formData.expiryDate,
    brand: formData.brand,
    teamId,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);




      alert("Stock added successfully ✅");
      navigate("/dashboard");
    } catch (err) {
      console.error("Stock create error:", err);
      alert("Failed to save stock");
    }
  };

  /* ================= JSX ================= */

  return (
    <div className="min-h-screen bg-gray-50">
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

      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Add Stock Item</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-5"
        >
          <input
            name="name"
            placeholder="Item name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <input
            type="number"
            name="quantity"
            placeholder="Available quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            name="requiredQuantity"
            placeholder="Minimum required quantity"
            value={formData.requiredQuantity}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <select
  name="consumptionRate"
  value={formData.consumptionRate}
  onChange={handleChange}
  className="w-full border p-3 rounded"
>
  <option value="">Select consumption rate</option>
  {["daily", "weekly", "monthly", "rare"].map((c) => (
    <option key={c} value={c}>{c}</option>
  ))}
</select>
{errors.consumptionRate && (
  <p className="text-red-500">{errors.consumptionRate}</p>
)}

          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            {unitOptions.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>

          <select
            name="consumptionRate"
            value={formData.consumptionRate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Consumption rate</option>
            {consumptionRateOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <div>
            <label className="font-medium">Expiry Date (optional)</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full border p-3 rounded mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Example: bananas → choose 2–3 days from today
            </p>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded font-semibold">
            Save Stock
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default StockForm;
