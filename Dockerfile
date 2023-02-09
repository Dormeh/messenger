FROM node:16
WORKDIR /var/www/
EXPOSE 3000
RUN apt update
RUN git clone -b deploy --single-branch https://github.com/Dormeh/middle.messenger.praktikum.yandex/ /var/www/
RUN npm install
CMD cd /var/www/
CMD npm run serve
