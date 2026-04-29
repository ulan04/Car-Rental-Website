import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const stats = [
    { label: "Total Cars", value: "3+", icon: "🚗" },
    { label: "Daily Rentals", value: "50+", icon: "📅" },
    { label: "Happy Clients", value: "200+", icon: "⭐" },
  ];

  return (
    <div className="container">
      <div className="hero" style={{ textAlign: "center", padding: "60px 20px" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{t("welcome")}</h1>
        <p className="muted" style={{ fontSize: "1.1rem" }}>
          Premium car rental service in Kazakhstan
        </p>
      </div>

      <div className="grid" style={{ marginBottom: "40px" }}>
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>{s.icon}</div>
            <h3 style={{ fontSize: "1.8rem", margin: "8px 0" }}>{s.value}</h3>
            <p className="muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <button className="btn primary" onClick={() => navigate("/cars")}>
          Browse Cars
        </button>
      </div>
    </div>
  );
}

