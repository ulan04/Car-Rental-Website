import React from "react";
import { useNavigate } from "react-router-dom";

export default function International() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="hero">
        <h2>International Rental</h2>
        <p className="muted">
          Car rental support for international trips and airport pickup.
        </p>
      </div>

      <div className="service-layout">
        <div className="card">
          <h3>International Services</h3>
          <ul>
            <li>Airport pickup and return</li>
            <li>International driver license guidance</li>
            <li>Cross-border rental consultation</li>
            <li>Travel support for foreign customers</li>
          </ul>
        </div>

        <div className="card">
          <h3>Supported scenarios</h3>
          <ul>
            <li>Tourists visiting Kazakhstan</li>
            <li>Business travelers</li>
            <li>Airport transfer</li>
            <li>Short-term travel rental</li>
          </ul>

          <button className="btn primary" onClick={() => navigate("/support")}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}