// // lib/i18n.ts
// import { createInstance } from 'i18next'
// import { initReactI18next } from 'react-i18next'
// import resourcesToBackend from 'i18next-resources-to-backend'
// import { getOptions } from './i18nOptions'

// const initI18next = async (lng: string, ns: string | string[]) => {
//   const i18nInstance = createInstance()
//   await i18nInstance
//     .use(initReactI18next)
//     .use(resourcesToBackend((language, namespace) => import(`../../public/locales/${language}/${namespace}.json`)))
//     .init(getOptions(lng, ns))
//   return i18nInstance
// }

// export async function useTranslation(lng: string, ns: string | string[] = 'common', options: any = {}) {
//   const i18nextInstance = await initI18next(lng, ns)
//   return {
//     t: i18nextInstance.t,
//     i18n: i18nextInstance,
//     ...options
//   }
// }