FROM node:lts AS dependencies
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm install

FROM dependencies AS builder
COPY . .
RUN npm run build

FROM node:lts-slim AS production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./

CMD ["node", "dist/src/index.js"]
