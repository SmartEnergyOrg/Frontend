# stage 1: build
FROM node:alpine AS build

WORKDIR /src/app

COPY . .

RUN npm ci && npm run build

# stage 2: deploy
FROM nginx:alpine
COPY --from=build /src/app/dist/status-monitor /usr/share/nginx/html
EXPOSE 80