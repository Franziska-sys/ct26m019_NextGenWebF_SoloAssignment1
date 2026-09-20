<script setup lang="ts">
import { ref, computed } from 'vue'
import TodoList from './TodoList.vue'
import { useTodos } from '../composables/useToDos'

type Filter = 'all' | 'open' | 'done'

// List of filter buttons and their labels
const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'open', label: 'Offen' },
  { value: 'done', label: 'Erledigt' },
]

//data and methods from the useTodos composable
const { todos , addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos()

// Local state for new todo text, filter selection, and form visibility
const newText = ref('')
const filter = ref<Filter>('all')
const showForm = ref(false)


const filteredTodos = computed(() => {
  if (filter.value === 'open') {
    return todos.value.filter((t) => !t.done)
  }
  if (filter.value === 'done') {
    return todos.value.filter((t) => t.done)
  }
  return todos.value
})

function submit(){
  addTodo(newText.value)
  newText.value = ''  
}
</script>

<template>
  <div>
     <header class="hero">
        <h1>ToDo-App</h1>
     </header>

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

    <div class="subheader">
      <h2>Tasks</h2>
      <button class="add-btn" @click="showForm = !showForm">+ Hinzufügen</button>
    </div>


    <div class="card">
      <div v-if="showForm" class="add-row">
        <input
        v-model="newText"
        placeholder="Neues Todo"
        @keyup.enter="submit"
      />
      <button class="add-btn" @click="submit">Speichern</button>
    </div>

    <TodoList
      :todos="filteredTodos"
      @toggle="toggleTodo"
      @update="updateTodo"
      @delete="deleteTodo"
    />
    </div>  
  </div>
</template>

<style scoped>
.hero {
  margin-top: 1rem;
  padding: 2.5rem 1rem;
  border-radius: 6px;
  text-align: center;
  color: var(--on-primary);
  background: var(--orange);
}
.hero h1 {
  margin: 0;
  font-size: 3rem;
}

.filters {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0 2rem;
}
.filters button {
  min-width: 9rem;
  padding: 0.7rem 1rem;
  border: none;
  border-right: 1px solid var(--bg);
  background: var(--ice-dark);
  color: var(--text);
}
.filters button:first-child {
  border-radius: 6px 0 0 6px;
}
.filters button:last-child {
  border-right: none;
  border-radius: 0 6px 6px 0;
}
.filters button.active {
  background: var(--orange);
  color: var(--on-primary);
}

.subheader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.subheader h2 {
  margin: 0;
  font-size: 1.8rem;
}

.add-btn {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: var(--orange);
  color: var(--on-primary);
}

.card {
  padding: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: white;
}

.add-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.add-row input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  font: inherit;
}
</style>