FROM node:20-alpine as base

FROM base as builder

RUN cat <<EOF > $HOME/.npmrc
@my-org:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
EOF

WORKDIR /app

COPY package*json tsconfig.json src ./

RUN --mount=type=secret,id=GITHUB_TOKEN,required=true \
  GITHUB_TOKEN=$(cat /run/secrets/GITHUB_TOKEN) \
  npm ci

RUN npm run build

RUN npm prune --production

FROM base as runner

WORKDIR /app

ENV NODE_ENV="production"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono 


COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/dist /app/dist
COPY --from=builder --chown=hono:nodejs /app/package.json /app/package.json

USER hono

EXPOSE 3000

CMD ["node", "/app/dist/index.js"]
