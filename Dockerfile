FROM node:16
WORKDIR /var/www/
EXPOSE 3000
RUN apt update
RUN git clone -b sprint_4 --single-branch https://github.com/Dormeh/middle.messenger.praktikum.yandex/ /var/www/
RUN npm install
CMD npm run serve
