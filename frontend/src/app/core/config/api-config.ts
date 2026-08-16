export const getApiUrl = (): string => {
  // Always check current environment at runtime
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    console.log('Current hostname:', hostname);
    console.log('Current protocol:', protocol);
    
    // For local development only
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      console.log('Using local backend');
      return 'http://localhost:8080/api';
    }
    
    // For all other environments (Vercel, production, etc.)
    console.log('Using Render backend');
    return 'https://portfolio-0zf6.onrender.com/api';
  }
  
  // Server-side fallback (SSR)
  return 'https://portfolio-0zf6.onrender.com/api';
};

