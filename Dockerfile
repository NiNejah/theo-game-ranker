# syntax=docker/dockerfile:1

# ---- Build stage ---------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

# ---- Runtime stage -------------------------------------------------------
FROM nginx:alpine AS runtime
COPY --from=build /app/dist/theo-game-ranker/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
