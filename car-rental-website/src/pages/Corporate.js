import React, { useState } from "react";
import { useToast } from "../components/ToastContext";

export default function Corporate() {
  const { success } = useToast();
  const [form, setForm] = useState({
    company: "",
    contact: "",
    phone: "",
    carsNeeded: "",
    note: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    success("Corporate request submitted!");
    setForm({
      company: "",
      contact: "",
      phone: "",
      carsNeeded: "",
      note: "",
    });
  }

  return (
    <div className="container">
      <div className="hero">
        <h2>Corporate Rental</h2>
        <p className="muted">
          Car rental solutions for companies, teams, and business clients.
        </p>
      </div>

      <div className="service-layout">
        <div className="card">
          <h3>Corporate Solutions</h3>
          <ul>
            <li>Employee transportation</li>
            <li>Business meeting cars</li>
            <li>VIP client pickup</li>
            <li>Monthly company rental plans</li>
          </ul>

          <h3>Benefits</h3>
          <ul>
            <li>Flexible pricing</li>
            <li>Multiple vehicle options</li>
            <li>Priority support</li>
            <li>Long-term cooperation</li>
          </ul>
        </div>

        <div className="form-card">
          <h3>Request Corporate Plan</h3>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Company Name</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Contact Person</label>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Cars Needed</label>
                <input
                  type="number"
                  name="carsNeeded"
                  value={form.carsNeeded}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Requirements</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Describe your company needs..."
              />
            </div>

            <button className="btn primary" type="submit">
              Submit Corporate Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}