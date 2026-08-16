# Build stage
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/backend-1.0.0.jar app.jar
EXPOSE 8080

# Run the application with proper port binding
CMD ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]
