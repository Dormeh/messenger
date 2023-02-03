FROM node:16
WORKDIR /var/www/
EXPOSE 3000
RUN apt update
RUN git clone -b test --single-branch https://github.com/sapomaro/middle.messenger.praktikum.yandex/tree/sprint_4 /var/www/
RUN npm install
CMD cd /var/www/
CMD npm run start
