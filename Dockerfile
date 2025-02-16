# Use Node.js image to build the frontend
#FROM node:18 AS build

#WORKDIR /app

#COPY package.json package-lock.json ./
#RUN npm install

#COPY . .

#RUN npm run build
#CMD ["npx", "serve", "-s", "build", "-l", "3000"]
# Use Node.js image to build the frontend

FROM node:18 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest AS production


RUN rm /etc/nginx/conf.d/default.conf


COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
