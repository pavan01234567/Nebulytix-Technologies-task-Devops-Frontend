FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.29.5-alpine AS runtime
LABEL project="Nebulytix-Technologies-task-Devops-Frontend"
LABEL author="Pavan Kumar"
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
RUN chown -R appuser:appgroup \
    /usr/share/nginx \
    /var/cache/nginx \
    /var/log/nginx

USER appuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
CMD wget -q -O - http://0.0.0.0:8080/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
