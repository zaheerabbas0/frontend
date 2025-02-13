# Use Node.js image to build the frontend
FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build
CMD ["npx", "serve", "-s", "build", "-l", "3000"]