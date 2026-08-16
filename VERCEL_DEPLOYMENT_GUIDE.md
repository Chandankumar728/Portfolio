# Vercel Frontend Deployment Guide

Your backend is deployed at: **https://portfolio-0zf6.onrender.com**

## Prerequisites

1. **GitHub Account** with your Portfolio repository pushed
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)

---

## Step 1: Prepare Your Repository

Make sure all frontend configuration changes are committed:

```bash
git add .
git commit -m "Configure frontend for Render backend deployment"
git push
```

---

## Step 2: Deploy on Vercel

### Method A: Using Vercel Web Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Select your **Portfolio** GitHub repository
4. Click **"Import"**

5. **Configure Project:**
   - **Framework Preset:** Angular
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/frontend/browser`
   - **Environment Variables:** (Leave empty - using hardcoded backend URL)

6. Click **"Deploy"**

### Method B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd "D:\Chandan project\Portfolio"
vercel

# When prompted:
# - Link to existing project? Choose your project
# - Override settings? No (use vercel.json)
# - Production Deployment? Yes
```

---

## Step 3: Verify Deployment

After deployment completes:

1. **Check Deployment Status** in Vercel Dashboard
2. **Visit Your Frontend URL:** Copy the URL from Vercel dashboard
3. **Test Login:** Try logging in to the admin panel
4. **Check Browser Console (F12)** for any CORS or API errors

---

## Step 4: Update Render Backend CORS (if needed)

If you get CORS errors, update your backend's CORS configuration:

**File:** `backend/src/main/java/com/portfolio/config/SecurityConfig.java` or `CorsConfig.java`

Add your Vercel URL to allowed origins:

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
                    "http://localhost:4200",                    // Local dev
                    "http://localhost:3000",                    // Vercel local
                    "https://your-vercel-url.vercel.app"       // Production - REPLACE THIS
                ));
                config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(Arrays.asList("*"));
                config.setAllowCredentials(true);
                config.setMaxAge(3600L);
                return config;
            }))
            // ... rest of config
            .build();
    }
}
```

Then redeploy backend on Render.

---

## Frontend URLs

| Environment | URL |
|---|---|
| Local Development | `http://localhost:4200` |
| Production (Vercel) | `https://your-project.vercel.app` |

---

## Backend URL

| Environment | URL |
|---|---|
| Production (Render) | `https://portfolio-0zf6.onrender.com/api` |

---

## Troubleshooting

### 1. **Blank Page on Vercel**
- Check browser console for errors (F12)
- Clear browser cache (Ctrl+Shift+Delete)
- Check Vercel logs in dashboard

### 2. **API Calls Failing (404 or CORS errors)**
- Verify backend URL in `environment.prod.ts` is correct
- Check Render backend is running: Visit `https://portfolio-0zf6.onrender.com/api`
- Update CORS in backend if needed

### 3. **Login Not Working**
- Check JWT_SECRET matches between frontend and backend
- Check browser localStorage for token storage
- Check browser DevTools Network tab for API responses

### 4. **Slow First Load**
- Free Vercel tier can be slow
- Free Render tier spins down after 15 min of inactivity (first request takes 10-30s)
- Consider upgrading to paid tier for production

---

## Deployment Checklist

- [ ] Frontend code pushed to GitHub
- [ ] Environment files configured with Render URL
- [ ] Vercel project created
- [ ] Build completes successfully
- [ ] Frontend URL is accessible
- [ ] API calls reach Render backend
- [ ] Login works
- [ ] Can view portfolio content
- [ ] Admin panel loads (if authenticated)

---

## Next Steps

1. **Custom Domain:** Add your domain in Vercel Settings
2. **Environment Secrets:** For sensitive data, add to Vercel Environment Variables
3. **CI/CD:** Vercel auto-deploys on GitHub push
4. **Monitoring:** Check Vercel Analytics and Render logs regularly

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Angular Deployment:** https://angular.io/guide/deployment
- **Vercel CLI:** https://vercel.com/docs/cli

---

**Your deployment is almost complete!** 🚀
