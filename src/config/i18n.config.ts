import {createI18n} from "vue-i18n";

export const i18nConfig = createI18n({
    locale: 'fr',
    fallbackLocale: 'en',
    inheritLocale: true,
    legacy: false
});