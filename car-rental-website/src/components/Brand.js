import React from "react";
import { useNavigate } from "react-router-dom"; // 导入导航钩子
import logo from "../assets/logo.png";

export default function Brand() {
  const navigate = useNavigate();

  return (
    <div className="brand" onClick={() => navigate("/cars")} style={{ cursor: 'pointer' }}>
      <img src={logo} alt="Ulan Car Rental Logo" className="brand-logo" />
      <span className="brand-name">Ulan Car Rental</span>
    </div>
  );
}