FROM node:12.14.1-alpine

RUN npm i -g @adonisjs/cli

ENV TERM=xterm
ENV TZ=Asia/Bangkok

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package*.json ./

COPY . .
