# Frontend Configuration for Render Backend

After deploying your backend on Render, update your Angular frontend to point to the new backend URL.

## Step 1: Get Your Render Backend URL

1. Go to [render.com](https://render.com)
2. Click on your deployed service (portfolio-backend)
3. Copy the URL (e.g., `https://portfolio-backend-xxxx.onrender.com`)

## Step 2: Update Frontend Configuration

### Option A: Update environment.ts (Recommended)

**File:** `frontend/src/environments/environment.ts` (if it exists)

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://portfolio-backend-xxxx.onrender.com/api'  // Replace with your Render URL
};

export const environment_prod = {
  production: true,
  apiUrl: 'https://portfolio-backend-xxxx.onrender.com/api'
};
```

### Option B: Check/Update Admin Resource Config

**File:** `frontend/src/app/core/config/admin-resource-config.ts`

Look for any hardcoded API URLs and update:

```typescript
// Before:
const apiUrl = 'http://localhost:8080/api';

// After:
const apiUrl = 'https://portfolio-backend-xxxx.onrender.com/api';
```

### Option C: Update in Environment-Specific Files

If you have Angular environment files in `src/environments/`:

**src/environments/environment.ts** (Development):
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://portfolio-backend-xxxx.onrender.com/api'
};
```

**src/environments/environment.prod.ts** (Production):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://portfolio-backend-xxxx.onrender.com/api'
};
```

## Step 3: Update Services to Use Configuration

### In your API services (e.g., `admin-api.service.ts`, `portfolio-data.service.ts`):

```typescript
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Your API calls will now use the Render backend
}
```

## Step 4: Update proxy.conf.json (If Using Proxy)

If you're using the proxy configuration for local development:

```json
{
  "/api": {
    "target": "https://portfolio-backend-xxxx.onrender.com",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": "/api"
    }
  }
}
```

## Step 5: Build and Deploy Frontend

```bash
cd frontend

# Development build
ng serve

# Production build
ng build --configuration production
```

## Step 6: Handle CORS Issues (if any)

If you encounter CORS errors in the browser console:

### Add to your backend's Spring Security Config

**File:** `backend/src/main/java/com/portfolio/config/SecurityConfig.java`

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Arrays.asList(
                    "http://localhost:4200",                           // Local dev
                    "https://your-frontend-url.com"                    // Production
                ));
                config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(Arrays.asList("*"));
                config.setAllowCredentials(true);
                config.setMaxAge(3600L);
                return config;
            }))
            // ... rest of your security config
            .build();
    }
}
```

## Step 7: Deploy Frontend (Optional)

If deploying on Render:

1. Create another Render service for frontend (Node.js service)
2. Build Command: `cd frontend && npm install && npm run build`
3. Start Command: `cd frontend && npm start`
4. Deploy

## Testing the Connection

### Test Backend Health
```bash
curl https://portfolio-backend-xxxx.onrender.com/api/

# Should return a response (not 404)
```

### Test in Browser Console
```javascript
fetch('https://portfolio-backend-xxxx.onrender.com/api/health')
  .then(r => r.json())
  .then(data => console.log(data))
```

### Check Network Requests
In browser DevTools (F12 → Network tab), verify API calls are going to Render URL.

## Important Notes

- **Initial Response Slow?** Free Render tier spins down after 15 min of inactivity. First request after cold start takes 10-30 seconds.
- **SSL Certificate:** Render provides free HTTPS (required for modern browsers)
- **Credentials Handling:** Use HttpClient interceptors for tokens/auth headers

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check JWT token in localStorage/cookies |
| 403 Forbidden | Verify CORS configuration and user permissions |
| 404 Not Found | Check API endpoint paths match your backend |
| Network Error | Verify Render backend URL is correct and reachable |

---

**Need Help?**
- Check browser DevTools Network tab for actual request/response
- Check Render logs for backend errors
- Verify CORS settings if cross-origin requests fail
