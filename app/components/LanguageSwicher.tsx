// // components/LanguageSwitcher.tsx
// 'use client'
// import { useRouter } from 'next/navigation'
// import { getLocale } from 'next-intl/server'

// export default async function LanguageSwitcher() {
//   const currentLocale = await getLocale()
  
//   return (
//     <div className="flex gap-4">
//       <button 
//         onClick={() => {
//           // 客户端导航逻辑
//         }}
//         disabled={currentLocale === 'zh'}
//       >
//         中文
//       </button>
//       <button 
//         onClick={() => {
//           // 客户端导航逻辑
//         }}
//         disabled={currentLocale === 'en'}
//       >
//         English
//       </button>
//     </div>
//   )
// }