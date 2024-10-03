ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

ENV NODE_ENV=production

WORKDIR /src

FROM base as build

RUN npm i -g pnpm

COPY --link package.json pnpm-lock.yaml ./

RUN pnpm i

COPY --link . .

RUN pnpm build

FROM base

ENV PORT=$PORT

COPY --from=build /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]