# Build Stage
FROM node:18-alpine AS build
WORKDIR /app

# Use a dedicated layer for dependencies to cache them
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy the rest of the files
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
