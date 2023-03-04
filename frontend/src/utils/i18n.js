import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const Language = Object.freeze({
    CZ: 'cz',
})

i18n
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    // .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        fallbackLng: Language.CZ,
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        // react i18next special options (optional)
        react: {
            useSuspense: true,
            wait: false,
        },
    });

/**
 * This function creates a promise that resolves with the `i18n` object once the i18next library has finished loading.
 *
 * The purpose of this function is to avoid issues with asynchronous loading of the `i18next` library and translations.
 * When `i18n` is not fully loaded and something tries to use it to retrieve translations, the result will be undefined or an error.
 *
 * To avoid this, the `i18nLoaded` promise is created and resolved only when the `loaded` event is emitted by `i18n`, indicating
 * that the library has finished loading and is ready for use.
 *
 * @returns {Promise} A promise that resolves with the `i18n` object when the library has finished loading.
 */
export const i18nLoaded = new Promise((resolve) => {
    i18n.on('loaded', () => {
        resolve(i18n);
    });
});

export default i18n;
