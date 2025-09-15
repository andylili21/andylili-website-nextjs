// lib/intl.ts
import { getRequestConfig } from 'next-intl/server';

// 配置国际化（仅服务器端使用）

//ts-ignore
export default getRequestConfig(async ({ locale }) => ({
  locale,
  messages: await import(`../../public/locales/${locale}.json`),
}));