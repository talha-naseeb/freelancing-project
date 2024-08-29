import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsEN from "../../Json/En/translation.json";
import translationsAR from "../../Json/Ar/translation.json";

const storedLanguage = sessionStorage.getItem("selectedLanguage") || "ar";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationsEN,
    },
    ar: {
      translation: translationsAR,
    },
  },
  lng: storedLanguage, 
  fallbackLng: "ar", 
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
