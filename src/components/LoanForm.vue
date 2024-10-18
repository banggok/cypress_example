<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Name</label>
      <input id="name" v-model="name" type="text" />
      <span v-if="v$.name.$error">Name is required</span>
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email" />
      <span v-if="v$.email.$error">Email is invalid</span>
    </div>

    <div>
      <label for="loan_amount">Loan Amount</label>
      <input id="loan_amount" v-model="loan_amount" type="number" />
      <span v-if="v$.loan_amount.$error"
        >Loan amount must be greater than 0</span
      >
    </div>

    <button type="submit" :disabled="v$.invalid">Submit</button>
    <div v-if="message">{{ message }}</div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  email as emailValidator,
  minValue,
} from '@vuelidate/validators'

const name = ref('')
const email = ref('')
const loan_amount = ref<number | null>(null)
const message = ref<string | null>(null)

// Vuelidate rules
const rules = {
  name: { required },
  email: { required, email: emailValidator },
  loan_amount: { required, minValue: minValue(1) },
}

// Set up Vuelidate
const v$ = useVuelidate(rules, { name, email, loan_amount })

const submitForm = async () => {
  v$.value.$touch() // Mark all fields as touched for validation
  if (!v$.value.$invalid) {
    try {
      const response = await fetch('/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          loan_amount: loan_amount.value,
        }),
      })
      if (!response.ok) throw new Error('Failed to submit loan')
      message.value = 'Loan submitted successfully!'
    } catch (err) {
      message.value = (err as Error).message
    }
  }
}
</script>
