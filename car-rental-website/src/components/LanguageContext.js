import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    cars: "Cars",
    booking: "Booking",
    support: "Support",
    logout: "Logout",
    login: "Login / Register",
    longTerm: "Long-Term Rental",
    international: "International",
    corporate: "Corporate",
    searchPlaceholder: "Search by name or type...",
    welcome: "Welcome to Ulan Car Rental",
    phone: "400-616-6666"
  },
  cn: {
    cars: "车辆列表",
    booking: "在线预订",
    support: "客服支持",
    logout: "退出登录",
    login: "登录 / 注册",
    longTerm: "长期租车",
    international: "国际业务",
    corporate: "企业用车",
    searchPlaceholder: "搜索名称或型号...",
    welcome: "欢迎来到 Ulan 租车",
    phone: "400-616-6666"
  },
  kz: {
    cars: "Көліктер",
    booking: "Брондау",
    support: "Қолдау",
    logout: "Шығу",
    login: "Кіру / Тіркелу",
    longTerm: "Ұзақ мерзімді",
    international: "Халықаралық",
    corporate: "Корпоративтік",
    searchPlaceholder: "Аты немесе түрі бойынша іздеу...",
    welcome: "Ulan Car Rental-ға қош келдіңіз",
    phone: "400-616-6666"
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("app_lang");
    return saved || "en";
  });

  useEffect(() => {
    localStorage.setItem("app_lang", lang);
  }, [lang]);

  const t = (key) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};