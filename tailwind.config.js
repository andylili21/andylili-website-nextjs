// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-light": "#ffffff",
        "text-light": "#171717",
        "background-dark": "#0a0a0a",
        "text-dark": "#ededed",
        // CyberTruck 拉丝不锈钢配色系统
        "steel-black": "#0A0A0A",      // 深空黑
        "steel-dark": "#1A1A1A",       // 磨砂黑
        "steel-silver": "#C0C0C0",     // 拉丝银
        "steel-bright": "#E8E8E8",     // 亮银
        "steel-gray": "#808080",       // 中性灰
        "steel-white": "#FFFFFF",      // 纯白
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // 拉丝金属纹理
        "brushed-metal": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
      },
      borderRadius: {
        'steel': '2px',  // CyberTruck 极微圆角
      },
      boxShadow: {
        'steel': '0 4px 12px rgba(0, 0, 0, 0.3)',
        'steel-hover': '0 10px 30px rgba(0, 0, 0, 0.4)',
        'steel-inset': 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
