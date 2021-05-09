FROM node:latest

WORKDIR /usr/scr/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
COPY . .

EXPOSE 5000
CMD ["npm", "start"]