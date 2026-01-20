import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from './locales/en';
import { ja } from './locales/ja';

const resources = {
  en: {
    translation: en
  },
  ja: {
    translation: ja 
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ja", // 使用する言語
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;