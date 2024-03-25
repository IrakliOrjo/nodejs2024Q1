# Build stage
FROM node:20-alpine3.18 AS builder
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig.build.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine3.18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.build.json ./
COPY --from=builder /app/tsconfig.json ./
COPY prisma ./prisma/
RUN npx prisma generate
EXPOSE 4000
CMD ["npm", "run", "start:docker"]

