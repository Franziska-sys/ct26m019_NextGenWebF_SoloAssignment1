<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '../types/todo'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'update', id: number, text: string): void
  (e: 'delete', id: number): void
}>()

// Local UI state, only this row needs to know about editing
const isEditing = ref(false)
const draft = ref('')

function startEdit() {
  draft.value = props.todo.text
  isEditing.value = true
}

function saveEdit() {
  const text = draft.value.trim()
  if (text !== '') emit('update', props.todo.id, text)
  isEditing.value = false
}

function cancelEdit() {
  isEditing.value = false
}
</script>

<template>
  <tr>
    <td class="check">
      <input
        type="checkbox"
        :checked="todo.done"
        @change="emit('toggle', todo.id)"
      />
    </td>

    <td>
      <input
        v-if="isEditing"
        v-model="draft"
        class="edit-input"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
      />
      <span v-else :class="{ done: todo.done }">{{ todo.text }}</span>
    </td>

    <td class="actions">
      <template v-if="isEditing">
        <button class="btn" @click="saveEdit">Speichern</button>
        <button class="btn" @click="cancelEdit">Abbrechen</button>
      </template>
      <template v-else>
        <button class="btn" @click="startEdit">Bearbeiten</button>
        <button class="btn danger" @click="emit('delete', todo.id)">
          Löschen
        </button>
      </template>
    </td>
  </tr>
</template>

<style scoped>
td {
  padding: 0.75rem;
  border-bottom: 1px solid var(--border);
}
tr:last-child td {
  border-bottom: none;
}
.check {
  text-align: center;
}
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
.edit-input {
  width: 100%;
  padding: 0.4rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font: inherit;
}
.actions {
  width: 1%;
  white-space: nowrap;
  text-align: right;
}
.btn {
  margin-left: 0.4rem;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: white;
  color: var(--text);
}
.danger {
  border-color: var(--danger);
  color: var(--danger);
}
</style>