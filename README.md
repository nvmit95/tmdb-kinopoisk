# TMDB Kinopoisk

Клиентское веб-приложение каталога фильмов на базе [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) — поиск, фильтры, категории, избранное и карточка фильма.

**Demo:** [https://tmdb-kinopoisk-liard.vercel.app/](https://tmdb-kinopoisk-liard.vercel.app/)

> **Важно:** API TMDB в ряде стран (в т.ч. РФ) может быть недоступен напрямую. Если фильмы не грузятся и в Network видно `ERR_CONNECTION_REFUSED` к `api.themoviedb.org` — включите VPN (например, сервер во **Франции** / EU) и обновите страницу.

## Возможности

- Главная с превью категорий: Popular, Top Rated, Upcoming, Now Playing
- Поиск фильмов по названию
- Фильтрация и сортировка (жанры, рейтинг, порядок сортировки)
- Страницы категорий с пагинацией
- Детальная страница фильма: постер, описание, актёрский состав, похожие фильмы
- Избранное с сохранением в `localStorage`
- Светлая / тёмная тема
- Адаптивная вёрстка (мобильное меню, сетки постеров)

## Стек

- **React 19** + **TypeScript**
- **Vite**
- **Redux Toolkit** + **RTK Query**
- **React Router**
- **MUI (Material UI)** + Emotion
- **Zod** — валидация ответов API
- Деплой: **Vercel**

## Архитектура

Feature-Sliced Design–подобная структура (`app` / `pages` / `widgets` / `features` / `entities` / `shared`):

- единый `baseApi` с Bearer-авторизацией TMDB
- runtime-валидация ответов через Zod-схемы
- централизованная обработка ошибок (snackbar) + Error Boundary
- тема и избранное — в Redux + persistence

## Быстрый старт

### 1. Установка

```bash
pnpm i
```

### 2. Переменные окружения

Скопируйте `.env.example` → `.env` и укажите данные из [TMDB API Settings](https://www.themoviedb.org/settings/api):

```env
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_API_KEY=your_tmdb_v4_read_access_token
```

> Нужен **API Read Access Token** (v4), не API Key v3.

### 3. Запуск

```bash
pnpm dev
```

Приложение: [http://localhost:3000](http://localhost:3000)

### Сборка

```bash
pnpm build
pnpm preview
```

## Деплой (Vercel)

В настройках проекта на Vercel добавьте те же переменные:

| Name            | Value                             |
|-----------------|-----------------------------------|
| `VITE_BASE_URL` | `https://api.themoviedb.org/3`    |
| `VITE_API_KEY`  | ваш TMDB v4 Read Access Token     |

`vercel.json` настроен на SPA-роутинг (все пути → `index.html`).

## Разделы приложения

| Раздел          | Путь               |
|-----------------|--------------------|
| Главная         | `/`                |
| Категории       | `/category-movies` |
| Фильтры         | `/filtered-movies` |
| Поиск           | `/search`          |
| Избранное       | `/favorites`       |
| Карточка фильма | `/movie/:movieId`  |

---

Данные фильмов предоставлены [TMDB](https://www.themoviedb.org/). Это не официальный продукт TMDB.
