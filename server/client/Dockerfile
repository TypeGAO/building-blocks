FROM node:latest as build
WORKDIR /app
RUN npm install yarn
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
EXPOSE 5173
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chmod=0755 /app/dist /usr/share/nginx/html

