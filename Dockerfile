# stage 1: build
FROM node:lts-hydrogen AS build

RUN mkdir -p /src/app/node_modules && chown -R node:node /src/app

WORKDIR /src/app

COPY --chown=node:node package*.json ./

USER node

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

# stage 2: deploy
FROM nginx:alpine

COPY --from=build /src/app/dist/status-monitor /usr/share/nginx/html
