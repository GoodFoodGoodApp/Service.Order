ARG NODE_VERSION=20.11.0
ARG NODE_ENV=production

# Build stage
FROM node:${NODE_VERSION}-alpine AS build

# Use production node environment by default.
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app
# Download dependencies as a separate step to take advantage of Docker's caching.

COPY package.json package-lock.json* ./

RUN npm ci && npm cache clean --force

# Copy the rest of the source files into the image.
COPY . .

RUN npm run build

# Production stage
FROM node:${NODE_VERSION}-alpine AS production

WORKDIR /usr/src/app
# Expose the port that the application listens on.
EXPOSE 8083

COPY package.json package-lock.json* ./

RUN npm ci --only=production

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]