import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Booking() {
  const location = useLocation();
  const selectedCar = location.state;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...form,
      selectedCar,
    };

    console.log("Booking Request:", payload);
    alert("Request submitted! Check console.");
  }

  if (!selectedCar) {
    return (
      <div className="container">
        <h2>No car selected</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Booking Request</h2>

      <div className="card">
        <strong>Selected Vehicle:</strong> {selectedCar.name} (
        {selectedCar.type}, {selectedCar.pricePerDay} KZT/day)
      </div>

      <form onSubmit={handleSubmit} className="form">
        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="pickupDate"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="returnDate"
          onChange={handleChange}
          required
        />
        <input
          name="pickupLocation"
          placeholder="Pickup Location"
          onChange={handleChange}
          required
        />

        <button className="btn primary" type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}