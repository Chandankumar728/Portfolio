# Render Deployment Checklist

## Before Deployment ✅

- [ ] Commit all changes to GitHub
  ```bash
  git add .
  git commit -m "Prepare for Render deployment"
  git push origin main
  ```

- [ ] Remove hardcoded secrets (Already done - check `application.properties`)

- [ ] Build locally to ensure no errors
  ```bash
  cd backend
  mvn clean install -DskipTests
  ```

## Render Setup Steps

### 1. Create Render Account
- [ ] Go to [render.com](https://render.com)
- [ ] Sign up with GitHub
- [ ] Grant repository access

### 2. Deploy Backend Service
- [ ] Click **"New +"** → **"Web Service"**
- [ ] Connect your Portfolio repository
- [ ] Configure:
  - **Name:** `portfolio-backend`
  - **Environment:** Java
  - **Build Command:** `cd backend && mvn clean install -DskipTests`
  - **Start Command:** `java -Dserver.port=$PORT -jar target/backend-1.0.0.jar`
  - **Plan:** Free (development) or Paid (production)

### 3. Set Environment Variables
Add these in Render dashboard (Settings → Environment):

```
DB_URL=jdbc:postgresql://your-neon-host:5432/neondb?sslmode=require
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your-jwt-secret-key
MAIL_USERNAME=your-gmail@gmail.com
MAIL_PASSWORD=your-gmail-app-password
MAIL_NOTIFY_TO=your-email@gmail.com
PORT=8080
```

### 4. Create PostgreSQL Database (Optional)
- [ ] If you want Render-hosted PostgreSQL:
  - Click **"New +"** → **"PostgreSQL"**
  - Link to your web service
- [ ] OR use existing Neon.tech database

## After Deployment ✅

- [ ] Check deployment status in Render dashboard
- [ ] View logs for any errors
- [ ] Test API endpoint: `https://your-backend-url.onrender.com/api/`
- [ ] Update frontend API URL in `frontend/src/core/config/`
- [ ] Configure CORS if frontend is on different domain

## Environment Variable References

### Gmail App Password Setup
1. Enable 2FA on Gmail account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer"
4. Copy the generated 16-character password
5. Use this as `MAIL_PASSWORD`

### Database Connection String Format
```
jdbc:postgresql://hostname:5432/database_name?sslmode=require
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Build fails with Java version | Ensure Java 17 is used (already in pom.xml) |
| Database connection fails | Check DB_URL format and credentials |
| Port already in use | Render uses PORT environment variable |
| Gmail authentication fails | Use App Password, not regular Gmail password |
| CORS errors from frontend | Add CORS configuration to Spring backend |

## Monitoring & Logs

- Real-time logs: Render Dashboard → Your Service → Logs
- Build logs: Shows Maven compilation output
- Runtime logs: Shows Spring Boot startup and requests

## Useful Render Commands

- **Redeploy:** Manual deploy button in dashboard
- **Roll back:** Deploy previous commit
- **View metrics:** Monitor CPU, Memory, Network usage
- **Custom domain:** Add your domain in service settings

---

**Estimated Deployment Time:** 2-5 minutes

**Questions?** Check logs in Render dashboard for detailed error messages.
