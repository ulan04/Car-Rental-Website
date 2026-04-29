import React, { useState } from "react";
import { useToast } from "../components/ToastContext";

export default function LongTermRental() {
  const { success } = useToast();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    duration: "1 month",
    carType: "Sedan",
    note: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    success("Long-term rental request submitted!");
    setForm({
      name: "",
      phone: "",
      duration: "1 month",
      carType: "Sedan",
      note: "",
    });
  }

  return (
    <div className="container">
      <div className="hero">
        <h2>Long-Term Rental</h2>
        <p className="muted">
          Flexible monthly car rental plans for personal and business use.
        </p>
      </div>

      <div className="service-layout">
        <div className="card">
          <h3>Why choose long-term rental?</h3>
          <ul>
            <li>Lower price for monthly rental</li>
            <li>Suitable for business trips and family use</li>
            <li>Maintenance support included</li>
            <li>Flexible contract duration</li>
          </ul>

          <h3>Available plans</h3>
          <ul>
            <li>1 month</li>
            <li>3 months</li>
            <li>6 months</li>
            <li>1 year</li>
          </ul>
        </div>

        <div className="form-card">
          <h3>Request Long-Term Rental</h3>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration</label>
                <select
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                >
                  <option>1 month</option>
                  <option>3 months</option>
                  <option>6 months</option>
                  <option>1 year</option>
                </select>
              </div>

              <div className="form-group">
                <label>Car Type</label>
                <select
                  name="carType"
                  value={form.carType}
                  onChange={handleChange}
                >
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Minivan</option>
                  <option>Business Class</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Note</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Write your requirements..."
              />
            </div>

            <button className="btn primary" type="submit">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}