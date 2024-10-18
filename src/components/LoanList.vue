<template>
  <div>
    <h1>Loan List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="loan in loans" :key="loan.id">
        {{ loan.loan_number }} - {{ loan.amount }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Loan {
  id: number
  loan_number: string
  amount: number
}

const loans = ref<Loan[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const fetchLoans = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/loans')
    if (!response.ok) throw new Error('Failed to fetch loans')
    loans.value = (await response.json()) as Loan[]
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchLoans()
})
</script>
