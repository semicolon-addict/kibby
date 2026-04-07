FROM node:24-alpine

RUN npm install -g pnpm

WORKDIR /app

# Copy workspace root files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.base.json ./

# Copy only what api-server needs
COPY artifacts/api-server ./artifacts/api-server
COPY lib ./lib

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the api-server
RUN pnpm --filter @workspace/api-server run build

WORKDIR /app/artifacts/api-server

EXPOSE 8080

CMD ["node", "dist/index.mjs"]