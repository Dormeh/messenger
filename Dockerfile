FROM node:16
WORKDIR /var/www/
EXPOSE 3000
RUN apt update
COPY . .
RUN npm install
CMD cd /var/www/
CMD npm run start
