# syntax=docker/dockerfile:1

# --- Build stage: compile the SPA to static assets ---
# Fully-qualified image names so the build also works under Podman, whose
# registry resolution does not implicitly default to docker.io.
FROM docker.io/library/node:22-alpine AS build
WORKDIR /app

# Install dependencies first for better layer caching.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Runtime stage: serve static files with nginx ---
FROM docker.io/library/nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
