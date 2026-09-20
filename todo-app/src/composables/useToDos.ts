import type { Todo } from '../types/todo'
import { useLocalStorage } from './useLocalStorage'

export function useTodos() {
  const todos = useLocalStorage<Todo[]>('todos', [])

  // Continue after the highest id, so ids stay unique after a reload
  function nextId() {
    return todos.value.reduce((max, t) => Math.max(max, t.id), 0) + 1
  }

  function addTodo(text: string) {
    const clean = text.trim()
    if (clean === '') return
    todos.value.push({ id: nextId(), text: clean, done: false })
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.done = !todo.done
  }

  function updateTodo(id: number, text: string) {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.text = text
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  return { todos, addTodo, toggleTodo, updateTodo, deleteTodo }
}