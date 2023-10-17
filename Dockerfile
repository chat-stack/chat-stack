# Credits to https://www.tomray.dev/nestjs-docker-compose-postgres
# But extend to include local, dev, staging, production environment

###################
# BUILD FOR LOCAL
###################

FROM node:20.7-alpine3.17 As local

# Create app directory
WORKDIR /usr/src/app


# Install Chromium (for Puppeteer and other headless browser tasks)
RUN apk update && apk add --no-cache chromium chromium-chromedriver
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENV CHROMIUM_BIN=/usr/bin/chromium-browser

# Copy application dependency manifests to the container image.
# Copying this first prevents re-running pnpm install on every code change.
COPY --chown=node:node package.json pnpm-lock.yaml* ./

ENV NODE_ENV local

# Install app dependencies using pnpm
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:20.7-alpine3.17 As build-production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# In order to run `pnpm run build` we need access to the Nest CLI.
# The Nest CLI is a dev dependency,
# In the previous local stage we ran `pnpm install` which installed all dependencies.
# So we can copy over the node_modules directory from the development image into this build image.
COPY --chown=node:node --from=local /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm install -g @nestjs/cli
RUN pnpm run build

# Set NODE_ENV environment variable
ARG NODE_ENV_ARG
ENV NODE_ENV $NODE_ENV_ARG

# Running `pnpm install` removes the existing node_modules directory.
# Passing in --prod ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
RUN pnpm install --prod

USER node

###################
# PRODUCTION
###################

FROM node:20.7-alpine3.17 As production

# Create app directory
WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build-production /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=build-production /usr/src/app/dist ./dist

# Start the server using the production build
EXPOSE $PORT
CMD [ "node", "dist/main.js" ]
