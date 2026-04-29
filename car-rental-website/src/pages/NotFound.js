import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container" style={{ textAlign: "center", padding: "100px 0" }}>
      <h1 style={{ fontSize: "72px", color: "#11a9bc" }}>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for doesn't exist.</p>
      <button className="btn primary" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}