FROM node:latest

WORKDIR /app

COPY . .

RUN npm install yarn
RUN yarn install

EXPOSE 5173
EXPOSE 3000

CMD yarn prod