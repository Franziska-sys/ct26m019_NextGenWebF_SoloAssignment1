<script setup lang="ts">
import type { Todo } from '../types/todo'

// list/todo item is passed in via props
defineProps<{
  todo: Todo
}>()

//Emit events to the parent (TodoList.vue) when the user toggles or removes a todo item
const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>


<template>
  <li class="item">
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @change="emit('toggle', todo.id)"
      />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </label>
    <button @click="emit('remove', todo.id)">Löschen</button>
  </li>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

label {
  text-align: left;
  overflow-wrap: anywhere;
}

.done {
  text-decoration: line-through;
  opacity: 0.6;
}

</style>