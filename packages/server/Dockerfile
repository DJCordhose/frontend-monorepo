FROM node:slim

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY src src
EXPOSE 7000
CMD [ "node", "src/index.js" ]