# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime stage
FROM nginx:1.29.5-alpine
LABEL project="Nebulytix-Technologies-task-Devops-Frontend"
LABEL author="Pavan Kumar"

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend build
COPY --from=builder /app/dist /usr/share/nginx/html

# Permissions
RUN chown -R appuser:appgroup /usr/share/nginx /var/cache/nginx

# Switch user
USER appuser

# Expose non-privileged port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q -O - http://localhost:8080/health || exit 1

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
