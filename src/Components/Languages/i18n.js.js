import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationsEN from "../../Json/En/translation.json";
import translationsAR from "../../Json/Ar/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationsEN,
    },
    ar: {
      translation: translationsAR,
    },
  },
  lng: "ar",
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
