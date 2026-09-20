<script setup lang="ts">
import type { Todo } from '../types/todo'
import TodoItem from './TodoItem.vue'

defineProps<{
  todos: Todo[]
}>()

defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <ul v-if="todos.length > 0">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="$emit('toggle', $event)"
      @remove="$emit('remove', $event)"
    />
  </ul>
  <p v-else>Keine Todos vorhanden.</p>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
</style>