<template>
  <div>
    <h2>Loan Application - Step {{ currentStep + 1 }}</h2>
    <div v-if="currentStep === 0">
      <StepPersonalInfo v-model="formData.personalInfo" />
    </div>
    <div v-else-if="currentStep === 1">
      <StepLoanDetails v-model="formData.loanDetails" />
    </div>

    <div class="stepper-buttons">
      <button @click="prevStep" :disabled="currentStep === 0">Back</button>
      <button @click="nextStep" v-if="!isLastStep">Next</button>
      <button @click="submitForm" v-if="isLastStep">Submit</button>
    </div>
    <div v-if="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import StepPersonalInfo from './StepPersonalInfo.vue'
import StepLoanDetails from './StepLoanDetails.vue'

const currentStep = ref(0)
const message = ref<string | null>(null)
const formData = ref({
  personalInfo: {
    name: '',
    email: '',
  },
  loanDetails: {
    loan_amount: null,
    loan_term: null,
  },
})

const isLastStep = computed(() => currentStep.value === 1)

const nextStep = () => {
  if (currentStep.value === 0 && !formData.value.personalInfo.name) {
    alert('Please enter your name')
    return
  }
  currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitForm = async () => {
  try {
    const response = await fetch('/api/loans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value),
    })
    if (!response.ok) throw new Error('Failed to submit loan')
    message.value = 'Loan application submitted successfully!'
  } catch (err) {
    message.value = (err as Error).message
  }
}
</script>

<style scoped>
.stepper-buttons {
  margin-top: 20px;
}
button {
  margin-right: 10px;
}
</style>
