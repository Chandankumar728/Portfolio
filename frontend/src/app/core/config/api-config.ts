export const getApiUrl = (): string => {
  console.log('=== API URL DETECTION STARTED ===');
  
  // Check if localhost (for local development only)
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    const url = 'http://localhost:8080/api';
    console.log('✅ LOCALHOST DETECTED - Using local backend:', url);
    return url;
  }
  
  // For ALL other environments (Vercel, production, etc.)
  // ALWAYS use Render backend - NO other logic
  const renderBackendUrl = 'https://portfolio-0zf6.onrender.com/api';
  console.log('✅ USING RENDER BACKEND (production):', renderBackendUrl);
  
  if (typeof window !== 'undefined') {
    console.log('🌐 Running on hostname:', window.location.hostname);
    console.log('🔗 Running on URL:', window.location.href);
  }
  
  return renderBackendUrl;
};



