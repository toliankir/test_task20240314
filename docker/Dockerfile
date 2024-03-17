ARG IMAGE_TAG_NODEJS=20-alpine

###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:${IMAGE_TAG_NODEJS} AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:${IMAGE_TAG_NODEJS} AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:${IMAGE_TAG_NODEJS} AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/docker/entrypoint.sh ./entrypoint.sh

EXPOSE 3000

CMD [ "./entrypoint.sh" ]