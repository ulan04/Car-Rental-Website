import React from "react";
import { NavLink } from "react-router-dom";
import Brand from "./Brand";
import NavLinks from "./NavLinks";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "./ThemeContext";

export default function Header() {
  const { setLang, lang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const languages = [
    { code: "en", label: "English", icon: "🌐" },
    { code: "cn", label: "中文", icon: "CN" },
    { code: "kz", label: "Қазақша", icon: "KZ" },
  ];

  return (
    <header className="main-header">
      <div className="container header-content">
        <div className="header-left">
          <Brand />
          <div className="divider"></div>

          <div className="header-lang">
            {languages.map(({ code, label, icon }) => (
              <div
                key={code}
                className={`lang-item ${lang === code ? "active-lang" : ""}`}
                onClick={() => setLang(code)}
                role="button"
                tabIndex={0}
                aria-label={`Switch to ${label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setLang(code);
                  }
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="header-right">
          <nav className="top-nav">
  <NavLink to="/long-term">{t("longTerm")}</NavLink>
  <NavLink to="/international">{t("international")}</NavLink>
  <NavLink to="/corporate">{t("corporate")}</NavLink>
</nav>
          <NavLinks />

          <button className="auth-btn theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          <div className="header-phone">
            <span className="phone-icon">📞</span>
            <span className="phone-number">+7-747-378-9142</span>
          </div>
        </div>
      </div>
    </header>
  );
}