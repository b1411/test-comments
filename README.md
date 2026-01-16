# Тестовое задание

Создать REST API модуль "Комментарии к задачам" для CRM-системы.

## Задача
Реализовать CRUD для комментариев к задачам.

### Бизнес-правила
1. Редактировать и удалять комментарий может только его автор
2. Текст комментария обязателен (1-1000 символов)
3. Комментарии возвращаются отсортированными по дате (новые первыми)

## Технологии

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Documentation**: Swagger
- **Containerization**: Docker

## Установка и запуск

### Предварительные требования
- Node.js (версия 18+)
- pnpm (или npm/yarn)
- Docker & Docker Compose

### Быстрый старт с Docker (База данных)

В проекте настроен `docker-compose` для запуска PostgreSQL.

1. **Запустите PostgreSQL в контейнере:**

   ```bash
   docker-compose up -d
   ```
   Это поднимет контейнер с PostgreSQL 15 на порту `5432`.
   - Пользователь: `postgres`
   - Пароль: `postgres`
   - База данных: `testcomments`

2. **Установите зависимости:**

   ```bash
   pnpm install
   ```

3. **Запустите приложение:**

   ```bash
   # Режим разработки (с hot-reload)
   pnpm start:dev

   # Продакшн режим
   pnpm start:prod
   ```

   Приложение будет доступно по адресу: http://localhost:3000

## API Документация

В проекте подключен Swagger. После запуска приложения полная интерактивная документация доступна по адресу:
**[http://localhost:3000/api](http://localhost:3000/api)**

### Основные эндпоинты

#### Комментарии (`/comments`)

| Метод  | Путь                | Описание                                      | Параметры / Тело / Заголовки |
|:-------|:--------------------|:----------------------------------------------|:-----------------------------|
| POST   | `/comments`         | Создать новый комментарий                     | Body: `CreateCommentDto`     |
| GET    | `/comments/:id`     | Получить комментарий по ID                    | Param: `id`                  |
| GET    | `/comments`         | Получить все комментарии к задаче             | Query: `task_id`             |
| PATCH  | `/comments/:id`     | Обновить текст комментария                    | Param: `id`<br>Header: `x-author-id` (для проверки владельца)<br>Body: `UpdateCommentDto` |
| DELETE | `/comments/:id`     | Удалить комментарий                           | Param: `id`<br>Header: `x-author-id` (для проверки владельца)|

## Docker Compose конфигурация

Файл `docker-compose.yaml` содержит конфигурацию базы данных:

```yaml
services:
  postgres:
    image: postgres:15
    container_name: test-comments-db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: testcomments
```
