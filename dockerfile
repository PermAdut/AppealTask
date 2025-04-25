#syntax=docker/dockerfile:1
ARG NODE_VERSION=22.9.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /usr/src


FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM base AS final
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb://host.docker.internal:24130/testDb
USER node
COPY package.json package-lock.json ./
COPY --from=deps /usr/src/node_modules ./node_modules
COPY --from=build /usr/src/dist ./dist

EXPOSE 4444

CMD ["node", "dist/server.js"]
