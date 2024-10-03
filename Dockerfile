ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g pnpm

FROM base as build

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY --link . .

RUN pnpm build

FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]