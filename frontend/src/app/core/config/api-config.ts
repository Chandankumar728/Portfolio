export const getApiUrl = (): string => {
  console.log('=== API URL DETECTION STARTED ===');
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const href = window.location.href;
    
    console.log('🌐 Window object available');
    console.log('📍 Current hostname:', hostname);
    console.log('🔗 Current protocol:', protocol);
    console.log('📄 Current full URL:', href);
    
    // For local development only
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      const localUrl = 'http://localhost:8080/api';
      console.log('✅ LOCALHOST DETECTED - Using local backend:', localUrl);
      return localUrl;
    }
    
    // For all other environments (Vercel, production, etc.)
    const renderUrl = 'https://portfolio-0zf6.onrender.com/api';
    console.log('✅ PRODUCTION DETECTED - Using Render backend:', renderUrl);
    console.log('🎯 Hostname is:', hostname, '(not localhost)');
    return renderUrl;
  } else {
    console.log('⚠️ Window object NOT available (SSR mode)');
  }
  
  // Server-side fallback (SSR)
  const fallbackUrl = 'https://portfolio-0zf6.onrender.com/api';
  console.log('🔄 Using fallback URL:', fallbackUrl);
  return fallbackUrl;
};


