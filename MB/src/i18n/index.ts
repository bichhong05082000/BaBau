import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';

export enum ELanguageType {
    English = 'en',
    VietNam = 'vn',
}

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    interpolation: {
        escapeValue: true,
    },
    lng: ELanguageType.English,
    fallbackLng: ELanguageType.English,
    resources: {
        en: {
            translation: en,
        },
    },
});

export default i18next;
