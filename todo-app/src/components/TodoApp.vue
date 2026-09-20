<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Todo } from '../types/todo'
import TodoList from './TodoList.vue'

type Filter = 'all' | 'open' | 'done'

// List of filter buttons and their labels
const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'open', label: 'Offen' },
  { value: 'done', label: 'Erledigt' },
]

//all the state is kept in this component, which is the parent of the list and items. 
// The list and items are just components that receive props and emit events.
const todos = ref<Todo[]>([])
const newText = ref('')
const filter = ref<Filter>('all')
let nextId = 1

const filteredTodos = computed(() => {
  if (filter.value === 'open') {
    return todos.value.filter((t) => !t.done)
  }
  if (filter.value === 'done') {
    return todos.value.filter((t) => t.done)
  }
  return todos.value
})

function addTodo() {
  const text = newText.value.trim()
  if (text === '') return

  todos.value.push({ id: nextId++, text, done: false })
  newText.value = ''
}

function toggleTodo(id: number) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) {
    todo.done = !todo.done
  }
}

function removeTodo(id: number) {
  todos.value = todos.value.filter((t) => t.id !== id)
}
</script>

<template>
  <section>
    <h1>ToDo-App</h1>

    <div class="filters">
      <button
        v-for="f in filters"
        :key="f.value"
        :class="{ active: filter === f.value }"
        @click="filter = f.value"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="add">
      <input
        v-model="newText"
        placeholder="Neues Todo"
        @keyup.enter="addTodo"
      />
      <button @click="addTodo">Hinzufügen</button>
    </div>

    <TodoList
      :todos="filteredTodos"
      @toggle="toggleTodo"
      @remove="removeTodo"
    />
  </section>
</template>

<style scoped>
section {
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.add,
.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.add input {
  flex: 1 1 0;
  min-width: 0;
}

.active {
  font-weight: bold;
}
</style>