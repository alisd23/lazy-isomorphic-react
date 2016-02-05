FROM node:slim

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build

EXPOSE 9000

ENTRYPOINT node server.js
