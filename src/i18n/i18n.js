import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import enJSON from '../locale/en.json'
import arJSON from '../locale/ar.json'
i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    ar: { ...arJSON },
  },
  lng: "ar",
});