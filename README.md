# Todo App

A small todo app built with Vue 3 and TypeScript. Todos can be added, edited, checked off, deleted and filtered. They are saved, so they survive a reload.

## Features

* Add todos (with the button or by pressing Enter)
* Mark todos as done with a checkbox
* Edit a todo text inline and save or cancel the change
* Delete todos
* Filter by All, Open and Done
* Todos stay saved after a page reload

## Getting started

Node.js needs to be installed. Then run the following commands in the project folder.

```bash
npm install
npm run dev
```

## Structure

* `src/types/todo.ts` contains the `Todo` interface
* `src/components/TodoApp.vue` holds the UI state and the filter
* `src/components/TodoList.vue` renders the table and the empty state
* `src/components/TodoItem.vue` renders a single todo row
* `src/composables/useTodos.ts` contains the todo logic
* `src/composables/useLocalStorage.ts` saves and loads data from localStorage

## Component structure

TodoApp is the parent of the list and the items, so data flows down through props and actions flow up through emits. This keeps the data flow in one direction and easy to follow. TodoList and TodoItem only display data and send events, which makes them simple and reusable. The todo logic and the persistence live in the composables useTodos and useLocalStorage, so they are independent of the user interface and the storage can be replaced later without touching any component.

## Persistence

`useLocalStorage` is a generic composable that returns a `ref` which is loaded from localStorage on start and saved on every change. `useTodos` builds on it and exposes the todos together with the functions to add, toggle, update and remove them.
