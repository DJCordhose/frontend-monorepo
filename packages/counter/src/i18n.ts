// adapted from https://www.robinwieruch.de/react-internationalization

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';

i18n
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(Backend)
    // connect with React
    .use(initReactI18next)
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: process.env.NODE_ENV !== 'production',

        lng: 'en',
        fallbackLng: 'en',
        whitelist: ['en', 'de'],

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
            format: function (value, format, locale) {
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
                if (format === 'euro') return new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: 'EUR'
                }).format(value);
                // if (format === 'number') return new Intl.NumberFormat(locale).format(value.valueOf());
                if (value instanceof Date) return new Intl.DateTimeFormat(locale).format(value);
                if (value instanceof Number) return new Intl.NumberFormat(locale).format(value.valueOf());
                if (typeof value === 'number') return new Intl.NumberFormat(locale).format(value);
                return value;
            }
        },

        backend: {
            loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;