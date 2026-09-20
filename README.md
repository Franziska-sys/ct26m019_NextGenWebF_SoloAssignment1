# Todo App

A small todo app built with Vue 3 and TypeScript.

## Features

* Add todos (with the button or by pressing Enter)
* Mark todos as done with a checkbox
* Delete todos
* Filter by All, Open and Done

## Getting started

Node.js needs to be installed. Then run the following commands in the project folder.

```bash
npm install
npm run dev
```

## Structure

* `TodoApp.vue` holds the state and logic
* `TodoList.vue` renders the list
* `TodoItem.vue` displays a single todo

Data flows down through props, and actions flow up through emits.
