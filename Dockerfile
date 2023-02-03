FROM node:16
WORKDIR /var/www/
EXPOSE 3000
RUN apt update
RUN git clone -b deploy --single-branch https://github.com/sapomaro/middle.messenger.praktikum.yandex.git /var/www/
RUN npm install
CMD cd /var/www/
CMD npm run start
