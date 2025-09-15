// lib/theme.ts
export const getTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
};

export const setTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

export const toggleTheme = () => {
  const current = getTheme();
  setTheme(current === 'light' ? 'dark' : 'light');
};