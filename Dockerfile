# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files separately to leverage Docker's cache mechanism
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the frontend
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Copy the built files to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
