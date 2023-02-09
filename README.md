### Описание:
##### Это учебный проект «Яндекс.Практикума» по курсу «Мидл фронтенд-разработчик».
##
-   [ссылка на проект в render.com](https://messenger-praktikum-yandex.onrender.com/)
-   [ссылка на проект в Netlify](https://endearing-boba-eb1973.netlify.app/) [![Netlify Status](https://api.netlify.com/api/v1/badges/b15a2583-ed5f-45c9-ba42-a9a82d39f41d/deploy-status)](https://app.netlify.com/sites/endearing-boba-eb1973/deploys)
-   [ссылка на макет в figma](https://www.figma.com/file/5EXKBt4MSSpbgsNjwKQVg7/messenger-ya-praktikum-course?node-id=0%3A1&t=x4gbiYken5G2nTRf-1)
##
#### Основные команды для управления проектом:

-   `npm install` - установка зависимостей.
-   `npm run serve` - запуск проекта в режиме разработки.
-   `npm run build` - запуск сборки проекта.
-   `npm run test` - запуск тестов
-   `npm run start` - сборка проекта и запуск сервера на потрту 3000.
##
Тестировние реализовано для:
- основных блоков `src/core`
- компонетов: Input, Button, Modal
- контроллера авторизации `src/services/auth`
##
#### Маршруты страниц
-   `/` — Главная страница с роутами
-   `/chat` — Чаты
-   `/auth` — Авторизация
-   `/registration` — Регистрация
-   `/profile` — Профиль
-   `/profile/edit` — Изменение данных профиля
-   `/profile/password` — Изменение пароля
-   `/404` — Ошибка 404
-   `/500` — Ошибка 500
##
##### Для локальной сборки и запуска контейнера через Docker:
```
   docker build -t messenger .
   docker run -p 3000:3000 -d messenger
```
##
##### Превью страниц приложения
![plot](src/asserts/ui/messanger.png 'Chat-page')
##
![Alt text](src/asserts/ui/messanger2.png 'auth-page')
##
![Alt text](src/asserts/ui/messanger3.png 'add user')
##
![Alt text](src/asserts/ui/messanger4.png 'add chat')
