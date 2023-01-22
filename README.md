## Описание:

#### Это учебный проект «Яндекс.Практикума» по курсу «Мидл фронтенд-разработчик». 
##
 - [ссылка на проект в Netlify](https://endearing-boba-eb1973.netlify.app/) [![Netlify Status](https://api.netlify.com/api/v1/badges/b15a2583-ed5f-45c9-ba42-a9a82d39f41d/deploy-status)](https://app.netlify.com/sites/endearing-boba-eb1973/deploys)
 - [ссылка на макет в figma](https://www.figma.com/file/5EXKBt4MSSpbgsNjwKQVg7/messenger-ya-praktikum-course?node-id=0%3A1&t=x4gbiYken5G2nTRf-1)

##
переход на страницы приложения по списку из корня сайта либо по навигации внутри страниц
##
parcel в production обнуляет файл svg спрайта, так что все иконки добавлены в шаблоны напрямую (в следующем спринте поменяется сборщик и вернется sprite)
##
#### Команды для управления проектом:

- `npm install` - установка зависимостей.
- `npm run dev` - запуск проекта в режиме разработки.
- `npm run build` - запуск сборки проекта.
- `npm run start` - сборка проекта и запуск сервера на потрту 3000.

##

#### Маршруты страниц

- `/` — Главная страница с роутами
- `/chat` — Чаты
- `/auth` — Авторизация
- `/registration` — Регистрация
- `/profile` — Профиль
- `/profile/edit` — Изменение данных профиля
- `/profile/password` — Изменение пароля
- `/404` — Ошибка 404
- `/500` — Ошибка 500

##

![plot](src/asserts/ui/messanger.png "Chat-page")

##

![Alt text](src/asserts/ui/messanger2.png "auth-page")

##

![Alt text](src/asserts/ui/messanger3.png "add user")

##

![Alt text](src/asserts/ui/messanger4.png "add chat")
