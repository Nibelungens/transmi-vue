import { createI18n } from 'vue-i18n'

function loadLocaleMessages () {
  const messages = {}
  const locales = import.meta.glob('./locales/**/*.json', { eager: true, import: 'default' })
  Object.entries(locales).forEach(([key, message]) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = message
    }
  })
  return messages
}

export default createI18n({
  legacy: true,
  globalInjection: true,
  locale: import.meta.env.VITE_I18N_LOCALE || 'en',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
