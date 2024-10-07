FROM node:20.16.0-alpine as base
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .

FROM base as dev
EXPOSE  3000
CMD sleep infinity
