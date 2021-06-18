FROM node:15.2.0-buster AS build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

ARG configuration=production

RUN npm run build -- --output-path=./dist/Gesofia --configuration $configuration

FROM nginx:1.15

COPY --from=build-stage /app/dist/Gesofia/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/nginx.conf