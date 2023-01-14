# Чат

* Макет в Figma: [https://www.figma.com/file/GYtBFev8rv4UY70nzyODSs/Chat_external_link-(Copy)?node-id=0%3A1&t=8kqjuSEsvNpGH4YL-0](https://www.figma.com/file/GYtBFev8rv4UY70nzyODSs/Chat_external_link-(Copy)?node-id=0%3A1&t=8kqjuSEsvNpGH4YL-0)
* Опубликованное в Netlify приложение: [https://eloquent-tartufo-4f4f05.netlify.app/](https://eloquent-tartufo-4f4f05.netlify.app/)

## Что это?

Учебный проект, который выполняется в рамках обучения на курсе [Мидл фронтенд-разработчик](https://praktikum.yandex.ru/middle-frontend/) от [Яндекс.Практикум](https://praktikum.yandex.ru).

## Текущий этап

Спринт 1 из 4

## Шаблонизатор и HTMLparser

Шаблонизатор использует [HTML парсер](https://github.com/werdner/middle.messenger.praktikum.yandex/blob/sprint_1/src/utils/HTMLParser.js), который был разработан мной в рамках спринта.
HTMLparser парсит из строки HTML элементы люой вложенности. Поддерживает передачу аттрибутов в элементы, в том числе className, onEvent. Аттрибуты связанные с событиями преобразовываются в обработчик события, который вешается на элемент.
Есть поддержка одиночный и парный тегов. Если между парными тегами нет любого другого узла, можно воспользоваться символом / перед закрытием тега.

## Спринт 1

https://github.com/werdner/middle.messenger.praktikum.yandex/tree/sprint_1

* Свёрстан макет приложения чат в Figma. [Ссылка на макет](https://www.figma.com/file/GYtBFev8rv4UY70nzyODSs/Chat_external_link-(Copy)?node-id=0%3A1&t=8kqjuSEsvNpGH4YL-0)
* Разработан собственный [шаблонизатор](https://github.com/werdner/middle.messenger.praktikum.yandex/blob/sprint_1/src/utils/Templator.js)
* Настроена сборка с использованием [Parcel](https://parceljs.org/) и раздача статики сервером на Express
* Свёрстаны основные страницы приложения с использованием шаблонизатора
* Приложение автоматически деплоится на [Netlify](https://www.netlify.com/) из ветки `deploy`. [Ссылка на приложение](https://eloquent-tartufo-4f4f05.netlify.app/)
