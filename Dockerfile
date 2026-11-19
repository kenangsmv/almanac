# syntax=docker/dockerfile:1

# --- Build stage: compile the SPA to static assets ---
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first for better layer caching.
COPY package.json package-lock.json ./
RUN npm ci

# Vite inlines VITE_* vars at build time, so the NASA key is a build arg.
ARG VITE_NASA_API_KEY=DEMO_KEY
ENV VITE_NASA_API_KEY=$VITE_NASA_API_KEY

COPY . .
RUN npm run build

# --- Runtime stage: serve static files with nginx ---
FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
