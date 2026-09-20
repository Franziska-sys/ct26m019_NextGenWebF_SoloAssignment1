<script setup lang="ts">
import type { Todo } from '../types/todo'
import TodoItem from './TodoItem.vue'

defineProps<{
  todos: Todo[]
}>()

// The list only forwards the events of its items
const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'update', id: number, text: string): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div v-if="todos.length > 0" class="table-box">
    <table class="table">
      <thead>
        <tr>
          <th class="narrow">Erledigt</th>
          <th>Aufgabe</th>
          <th class="narrow right">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @toggle="emit('toggle', $event)"
          @update="(id, text) => emit('update', id, text)"
          @delete="emit('delete', $event)"
        />
      </tbody>
    </table>
  </div>
  <p v-else class="empty">Keine Todos vorhanden.</p>
</template>


<style scoped>
.table-box {
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
th {
  padding: 0.75rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  text-align: left;
}
.narrow {
  width: 1%;
  white-space: nowrap;
}
.right {
  text-align: right;
}
.empty {
  padding: 2rem 0;
  text-align: center;
  color: #888;
}
</style>