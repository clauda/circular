FROM node:16-alpine As development

WORKDIR /app

COPY --chown=node:node ./package*.json /app/
COPY --chown=node:node ./.env.example /app/.env

RUN npm ci


# BUILD

FROM node:16-alpine As build

# USER node

WORKDIR /app

COPY --chown=node:node ./package*.json /app/

COPY --chown=node:node --from=development /app /app/
COPY --chown=node:node ./tsconfig.build.json /app/tsconfig.build.json
COPY --chown=node:node ./tsconfig.json /app/tsconfig.json
COPY --chown=node:node ./src /app/src/

RUN npm run build

ENV NODE_ENV production

RUN npm ci --omit=dev && npm cache clean --force

USER node

# PRODUCTION

FROM node:16-alpine As production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist /app/dist

CMD [ "node", "/app/dist/main.js" ]
