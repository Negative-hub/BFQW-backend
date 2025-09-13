# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Опционально: если есть lock-файл, лучше копировать его
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY tsconfig*.json nest-cli.json* ./
COPY src ./src

RUN npm run build

# ---- run stage ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Порт по умолчанию у Nest — 3000
EXPOSE 3000

# Копируем только то, что нужно для рантайма
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

COPY --from=build /app/dist ./dist

CMD ["node","dist/main.js"]