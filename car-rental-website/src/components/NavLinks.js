import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useLanguage } from "./LanguageContext"; 

export default function NavLinks() {
  const { isLoggedIn, logout } = useAuth();
  const { t } = useLanguage(); 

  return (
    <nav className="nav">
   
      <NavLink to="/cars" className={({ isActive }) => isActive ? "active" : ""}>
        {t("cars")}
      </NavLink>
      <NavLink to="/booking" className={({ isActive }) => isActive ? "active" : ""}>
        {t("booking")}
      </NavLink>
      <NavLink to="/support" className={({ isActive }) => isActive ? "active" : ""}>
        {t("support")}
      </NavLink>
      
      {isLoggedIn ? (
        <button onClick={logout} className="auth-btn logout-style">
          {t("logout")}
        </button>
      ) : (
        <NavLink to="/login" className="auth-btn login-style">
          {t("login")}
        </NavLink>
      )}
    </nav>
  );
}