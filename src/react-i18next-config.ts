import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from 'i18next'
import cn from './locales/zh-cn.json'
import en from './locales/en-ww.json'
import ko from './locales/ko-kr.json'
import { initReactI18next } from 'react-i18next'
const resources = {
  cn: {
    translation: cn
  },
  en: {
    translation: en
  },
  ko: {
    translation: ko
  },
};
i18n.use(LanguageDetector)
.use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
    }
  })

export default i18n