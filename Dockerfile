FROM node:24-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.base.json ./
COPY artifacts/api-server ./artifacts/api-server
COPY lib ./lib

RUN pnpm install --frozen-lockfile

RUN pnpm --filter @workspace/api-server run build

WORKDIR /app/artifacts/api-server

EXPOSE 10000

CMD ["node", "dist/index.mjs"]