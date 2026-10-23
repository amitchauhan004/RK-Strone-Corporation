const rawUrl = 
  import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000'
    : 'https://rk-strone-corporation.vercel.app');

// Clean and export API URL without trailing slash
export const API_URL = String(rawUrl).replace(/\/+$/, '');
