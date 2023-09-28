FROM node:17.1-alpine as build-stage
WORKDIR /building-blocks
COPY package*.json ./
COPY . .
RUN npm install
CMD ["npm", "start"]

# FROM nginx:1.22.1-alpine as prod-stage
# COPY --from=build-stage /building-blocks/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]