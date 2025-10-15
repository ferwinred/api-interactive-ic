# Stage 1 — build
FROM node:20-alpine AS build
WORKDIR /app
# Copy package files first (cache de dependencias)
COPY package*.json ./
RUN npm ci --production=false
COPY . .
# Si usas TypeScript (Nest), build:
RUN npm run build

# Stage 2 — runtime
FROM node:20-alpine AS runtime
WORKDIR /app
# Solo las dependencias necesarias para producción
COPY package*.json ./
RUN npm ci --production=true

# Copiamos la salida del build
COPY --from=build /app/dist ./dist
# Si tu app no usa dist (pure JS), copia el proyecto:
# COPY --from=build /app . 

# Puerto que usará la app (no estrictamente necesario, pero útil)
EXPOSE 3000

# Asegúrate que tu start script use process.env.PORT o fallback 3000
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]
# o si no usas ts build, por ejemplo:
# CMD ["node", "index.js"]
