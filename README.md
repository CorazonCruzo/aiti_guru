# Панель управления товарами

[Демо](https://aitiguru.vercel.app/)

## Суть

SPA-приложение для управления каталогом товаров: авторизация, просмотр таблицы товаров с сортировкой/поиском/пагинацией, добавление нового товара. Данные приходят из [DummyJSON API](https://dummyjson.com).

## Особенности

- Авторизация с поддержкой **Remember Me** (localStorage / sessionStorage)
- Автоматическое обновление токенов через refresh endpoint
- Серверная сортировка и пагинация, клиентская сортировка при поиске
- Состояние сортировки сохраняется в URL
- Добавление товара через модалку (локально, API не сохраняет)
- Валидация форм через zod-схемы
- Error boundary на уровне роутера
- Архитектура — Feature-Sliced Design (FSD)

## Стек

React 19, TypeScript 5, Vite 7, React Router 7, Zustand, TanStack Query, TanStack Table, react-hook-form + zod, axios, CSS Modules, Phosphor Icons

## Запуск

```bash
yarn install
yarn dev
```

Тестовый аккаунт: `emilys` / `emilyspass`

## Скрипты

| Команда | Описание |
|---------|----------|
| `yarn dev` | Dev-сервер |
| `yarn build` | Production-сборка |
| `yarn lint` | Проверка ESLint |
| `yarn format` | Prettier + ESLint |
| `yarn type-check` | Проверка типов |
