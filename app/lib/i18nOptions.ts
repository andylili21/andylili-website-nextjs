// lib/i18nOptions.ts
export function getOptions(lng = 'zh', ns = 'common') {
  return {
    // debug: true,
    supportedLngs: ['zh', 'en'],
    fallbackLng: 'zh',
    lng,
    fallbackNS: 'common',
    defaultNS: 'common',
    ns
  }
}