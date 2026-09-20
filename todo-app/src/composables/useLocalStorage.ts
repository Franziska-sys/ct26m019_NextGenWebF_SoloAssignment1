import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
    let start = initialValue

 try {
    const raw = localStorage.getItem(key)
    if (raw !== null) start = JSON.parse(raw) as T
  } catch {
    // Broken or unavailable storage, fall back to the initial value
  }

  const data = ref(start) as Ref<T>

  // Save on every change (deep, so edits inside the array are noticed too)
  watch(
    data,
    (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {
        // Ignore write errors (for example a full storage)
      }
    },
    { deep: true },
  )

  return data
}