# build stage
FROM node:20 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html