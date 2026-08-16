# Render Backend Deployment Guide

## Step 1: Prepare Your Repository

Ensure your backend is committed to GitHub:
```bash
cd backend
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 2: Create render.yaml Configuration

Create a `render.yaml` file in the root of your repository (or just the backend folder):

```yaml
services:
  - type: web
    name: portfolio-backend
    runtime: java
    plan: free
    buildCommand: mvn clean install -DskipTests
    startCommand: java -jar target/backend-1.0.0.jar
    envVars:
      - key: PORT
        value: 8080
      - key: JAVA_OPTS
        value: "-Dserver.port=$PORT"
      - key: DB_URL
        fromDatabase:
          name: portfolio-db
          property: connectionString
      - key: DB_USERNAME
        fromDatabase:
          name: portfolio-db
          property: user
      - key: DB_PASSWORD
        fromDatabase:
          name: portfolio-db
          property: password
      - key: JWT_SECRET
        sync: false
      - key: MAIL_USERNAME
        sync: false
      - key: MAIL_PASSWORD
        sync: false
      - key: MAIL_NOTIFY_TO
        sync: false

  - type: pserv
    name: portfolio-db
    plan: free
    ipAllowList: [] # Allow all IPs
```

## Step 3: Update Spring Boot for Render Deployment

### Option A: Add Build Plugin to pom.xml (Recommended)

Add this to your `<build>` section in pom.xml:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <mainClass>com.portfolio.PortfolioBackendApplication</mainClass>
            </configuration>
        </plugin>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.11.0</version>
            <configuration>
                <source>17</source>
                <target>17</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

### Option B: Create a Procfile

Create a `Procfile` in the root of your repository:

```
web: java -Dserver.port=$PORT -jar target/backend-1.0.0.jar
```

## Step 4: Update application.properties for Render

Modify your `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=false

# Server Configuration
server.port=${PORT:8080}
server.servlet.context-path=/api

# JWT Configuration
jwt.secret=${JWT_SECRET}

# Mail Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${MAIL_USERNAME}
spring.mail.password=${MAIL_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
mail.notify-to=${MAIL_NOTIFY_TO}
```

## Step 5: Deploy on Render

### Manual Steps:

1. **Go to [render.com](https://render.com)** and sign up/log in with GitHub
2. **Click "New +"** → Select **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the deployment:**
   - **Name:** `portfolio-backend`
   - **Environment:** `Java`
   - **Region:** Choose closest to you
   - **Build Command:** `mvn clean install -DskipTests`
   - **Start Command:** `java -Dserver.port=$PORT -jar target/backend-1.0.0.jar`
   - **Plan:** Free (or paid for better performance)

5. **Add Environment Variables:**
   - `PORT`: `8080`
   - `DB_URL`: Your Neon PostgreSQL URL (format: `jdbc:postgresql://host:5432/database?sslmode=require`)
   - `DB_USERNAME`: PostgreSQL username
   - `DB_PASSWORD`: PostgreSQL password
   - `JWT_SECRET`: Your JWT secret key
   - `MAIL_USERNAME`: Gmail username
   - `MAIL_PASSWORD`: Gmail App Password (not regular password)
   - `MAIL_NOTIFY_TO`: Notification email

6. **Create PostgreSQL Database (if needed):**
   - Click "New +" → Select **"PostgreSQL"**
   - Link it to your web service

7. **Deploy:** Click **"Create Web Service"**

## Step 6: Important Notes

### Gmail App Password
- Enable 2-Factor Authentication on your Gmail account
- Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- Generate an app password
- Use this instead of your regular Gmail password

### Database Connection
- If using Neon.tech, update connection string format
- Ensure SSL mode is enabled: `?sslmode=require`

### CORS Configuration (if needed)
Add this to your backend if your frontend is on a different domain:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("https://your-frontend-domain.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

### Free Tier Limitations
- Application spins down after 15 minutes of inactivity
- May have slower performance
- Recommended for development/testing only

## Step 7: Post-Deployment

1. **Test API:** Open your Render URL and append `/api/` to test
2. **Check logs:** In Render dashboard, view logs for errors
3. **Update frontend:** Update your Angular app's API URL to point to your Render backend URL
4. **Monitor:** Keep an eye on the Render dashboard for errors

## Troubleshooting

- **Build fails:** Check Maven build locally with `mvn clean install`
- **Runtime errors:** Check Render logs for database/environment variable issues
- **Connection timeout:** Verify database credentials and firewall rules
- **CORS errors:** Update CORS configuration in backend

---

Ready to deploy? Follow the steps above and let me know if you hit any issues!
