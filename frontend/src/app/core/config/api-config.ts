export const getApiUrl = (): string => {
  // PRODUCTION URL - Force Render backend for all non-localhost environments
  const RENDER_BACKEND_URL = 'https://portfolio-0zf6.onrender.com/api';
  
  console.log('%c🔍 API URL DETECTION STARTED', 'color: cyan; font-weight: bold;');

  if (typeof window === 'undefined') {
    console.log('%c🔗 SSR Mode - Using Render backend', 'color: orange;');
    return RENDER_BACKEND_URL;
  }

  const hostname = window.location.hostname;
  
  // ONLY use localhost for local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const localUrl = 'http://localhost:8080/api';
    console.log('%c✅ LOCALHOST DETECTED - Using local backend', 'color: yellow; font-weight: bold;');
    console.log('%c📍 Hostname:', `${hostname}`, 'color: yellow;');
    console.log('%c🔗 API URL:', localUrl, 'color: yellow;');
    return localUrl;
  }

  // For Vercel, production, or any other environment
  console.log('%c✅ PRODUCTION ENVIRONMENT - Using Render backend', 'color: lime; font-weight: bold;');
  console.log('%c📍 Hostname:', `${hostname}`, 'color: lime;');
  console.log('%c🔗 API URL:', RENDER_BACKEND_URL, 'color: lime;');
  console.log('%c🌐 Full URL:', window.location.href, 'color: lime;');

  return RENDER_BACKEND_URL;
};



