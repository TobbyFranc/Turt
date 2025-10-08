import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      home: "Home",
      about: "About",
      explore: "Explore",
      teams: "Teams",
      faqs: "FAQs",
      getStarted: "Get Started",
      darkModeOn: "Dark mode enabled 🌙",
      lightModeOn: "Light mode enabled ☀️",
      aiChat: "AI Chat 🤖",
      supportChat: "Support 🧑‍💼",
      send: "Send",
      typeMessage: "Type your message...",
    },
    fr: {
      home: "Accueil",
      about: "À propos",
      explore: "Explorer",
      teams: "Équipes",
      faqs: "FAQs",
      getStarted: "Commencer",
      darkModeOn: "Mode sombre activé 🌙",
      lightModeOn: "Mode clair activé ☀️",
      aiChat: "Chat IA 🤖",
      supportChat: "Assistance 🧑‍💼",
      send: "Envoyer",
      typeMessage: "Tapez votre message...",
    },
    yo: {
      home: "Ile",
      about: "Nipa",
      explore: "Ṣawari",
      teams: "Ẹgbẹ",
      faqs: "FAQs",
      getStarted: "Bẹrẹ",
      darkModeOn: "Aṣa okunkun ti muu ṣiṣẹ 🌙",
      lightModeOn: "Aṣa ina ti muu ṣiṣẹ ☀️",
      aiChat: "Chat AI 🤖",
      supportChat: "Atilẹyin 🧑‍💼",
      send: "Firanṣẹ",
      typeMessage: "Tẹ ifiranṣẹ rẹ...",
    },
  };

  const t = (key) => translations[language]?.[key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
