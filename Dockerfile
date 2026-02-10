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

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy frontend build
COPY --from=builder /app/dist /usr/share/nginx/html

# Fix permissions
RUN chown -R appuser:appgroup \
    /usr/share/nginx \
    /var/cache/nginx \
    /var/log/nginx

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -q -O - http://localhost:8080/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
