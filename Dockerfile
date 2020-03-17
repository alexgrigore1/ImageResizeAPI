FROM node:10.13.0-alpine
WORKDIR /usr/app
COPY package.json .
RUN apk add python make gcc g++ \
    && npm install --quiet
COPY . .