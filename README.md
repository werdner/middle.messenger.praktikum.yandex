[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/werdner/middle.messenger.praktikum.yandex/tests.yml)](https://github.com/werdner/middle.messenger.praktikum.yandex/actions)

# Чат

* Макет в Figma: [https://www.figma.com/file/GYtBFev8rv4UY70nzyODSs/Chat_external_link-(Copy)?node-id=0%3A1&t=8kqjuSEsvNpGH4YL-0](https://www.figma.com/file/GYtBFev8rv4UY70nzyODSs/Chat_external_link-(Copy)?node-id=0%3A1&t=8kqjuSEsvNpGH4YL-0)
* Опубликованное в Netlify приложение: [https://eloquent-tartufo-4f4f05.netlify.app/](https://eloquent-tartufo-4f4f05.netlify.app/)

## Что это?

Учебный проект, который выполняется в рамках обучения на курсе [Мидл фронтенд-разработчик](https://praktikum.yandex.ru/middle-frontend/) от [Яндекс.Практикум](https://praktikum.yandex.ru).

### Сборка и запуск проекта
* `npm run build`
* `npm run start` - webpack serve

### Тест и проверка проекта
* `npm run test`
* `npm run lint`
* `npm run lint:style`

### Сборка и запуск Docker
* `docker build -t app .`
* `docker run -p 3000:3000 -d app`

## Текущий этап

Спринт 4 из 4

## Шаблонизатор и HTMLparser

Шаблонизатор использует [HTML парсер](https://github.com/werdner/middle.messenger.praktikum.yandex/blob/sprint_1/src/utils/HTMLParser.js), который был разработан мной в рамках спринта.
HTMLparser парсит из строки HTML элементы люой вложенности. Поддерживает передачу аттрибутов в элементы, в том числе className, onEvent. Аттрибуты связанные с событиями преобразовываются в обработчик события, который вешается на элемент.
Есть поддержка одиночный и парный тегов. Если между парными тегами нет любого другого узла, можно воспользоваться символом / перед закрытием тега.

## Технология виртуального дома VDom

Технология вирутального дома (`src/core/vDom`) позволяет создавать новые объекты, которые можно компилировать в дом элемент и монтировать в дом дерево.
Вновь созданные экземпляры вирутального дома можно сопостовлять друг с другом с помощью метода diff. В тот момент, когда diff находит различия между двумя элементами, применяется patch, который заменяет в DOM дереве старую версию узла на новую, без ререндера страницы.

## Спринт 1

https://github.com/werdner/middle.messenger.praktikum.yandex/tree/sprint_1

* Свёрстан макет приложения чат в Figma. [Ссылка на макет](https://www.figma.com/file/GYtBFev8rv4UY70nzyODSs/Chat_external_link-(Copy)?node-id=0%3A1&t=8kqjuSEsvNpGH4YL-0)
* Разработан собственный [шаблонизатор](https://github.com/werdner/middle.messenger.praktikum.yandex/blob/sprint_1/src/utils/Templator.js)
* Настроена сборка с использованием [Parcel](https://parceljs.org/) и раздача статики сервером на Express
* Свёрстаны основные страницы приложения с использованием шаблонизатора
* Приложение автоматически деплоится на [Netlify](https://www.netlify.com/) из ветки `deploy`. [Ссылка на приложение](https://eloquent-tartufo-4f4f05.netlify.app/)

## Спринт 2

https://github.com/werdner/middle.messenger.praktikum.yandex/tree/sprint_2

* Переход на TypeScript
* Реализация шины событийной модели (`src/core/EventBus.ts`)
* Реализация главного компонента (`src/core/Block.ts`)
* Реализация технологии [Вирутальный дом VDom](#Vdom) (Временная реализация, в планах есть доработать технологию с учетом структуры стэка и обхода дерева через поиск в гулибну. Возможно, это позволит сделать vDom быстрее, чем это сделано у реакта) (`src/core/vDom`)
* [Шаблонизатор](#шаблонизатор) переписан с учётом применения технологии виртуального дома
* Приложение переписано с учётом новых компонентов
* На основных формах реализована клиентская валидация

## Спринт 3

* Реализация клиентского роутера (classes/Route.ts, classes/Router.ts)
* Добавлен слой api
* Использован WebSocket для сообщений чата
* В приложении реализованы следующее возможности:
    * Регистрация
    * Логин
    * Выход
    * Обновление данных профиля
    * Изменение аватара
    * Создание и удаление чата
    * Отправка и получение текстовых сообщений

## Спринт 4

* Переход с Parcel на [Webpack](https://webpack.js.org/)
* Dockerfile для создания [docker](https://www.docker.com/) -контейнера с дистрибутивом и сервером на Express
* Настроен pre commit ([husky](https://typicode.github.io/husky/#/))
* Частично покрыто тестами ([jest](https://jestjs.io/))
* Настроен pre commit ([husky](https://typicode.github.io/husky/#/))

