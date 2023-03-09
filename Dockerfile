FROM node:18-alpine
RUN mkdir -p /var/app
WORKDIR /var/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
CMD node run start
