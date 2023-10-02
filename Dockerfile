FROM node:16.17.0 as build-stage
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.22.1-alpine as prod-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
