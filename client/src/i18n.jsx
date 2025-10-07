import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationBM from "./locales/bm/translation.json";

// Define resources
const resources = {
  en: {
    translation: translationEN,
  },
  bm: {
    translation: translationBM,
  },
};

i18n
.use(initReactI18next) // Initialize i18next
.use(LanguageDetector) // Detect user language
.init({
    resources,
    fallbacking: "en", // Default to English if lang not detected
    interpolation: {
        escapeValue: false, // React already does escaping
    },
});

export default i18n;