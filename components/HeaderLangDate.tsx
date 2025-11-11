
import React, { useEffect, useState } from "react";

const HeaderLangDate = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "en" ? "hi" : "en"));
  };

  return (
    <div
      style={{
        backgroundColor: "#585656ff",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "sans-serif"
      }}
    >
      <div>
        🕒 {dateTime.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })}
      </div>
      <div
        onClick={toggleLanguage}
        style={{
          cursor: "pointer",
          color: language === "hi" ? "orange" : "#fff",
          fontWeight: "bold"
        }}
      >
        {language === "en" ?  "English Version":"हिंदी संस्करण"}
      </div>
    </div>
  );
};

export default HeaderLangDate;
