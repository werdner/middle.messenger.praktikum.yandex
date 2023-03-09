FROM node:18.12.1-alpine
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
EXPOSE 3000
CMD npm install && npm run start
