export const getApiUrl = (): string => {
  // Check if running in production
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If running on Vercel domain, use Render backend
    if (hostname.includes('vercel.app') || hostname === 'localhost') {
      if (hostname === 'localhost') {
        return 'http://localhost:8080/api'; // Local development
      }
      // Production on Vercel - use Render backend
      return 'https://portfolio-0zf6.onrender.com/api';
    }
  }
  
  // Fallback to Render backend
  return 'https://portfolio-0zf6.onrender.com/api';
};
