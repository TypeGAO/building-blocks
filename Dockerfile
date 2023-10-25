FROM node:latest

WORKDIR /app

COPY . .
RUN npm install yarn
RUN yarn install

EXPOSE 3000

CMD yarn start
