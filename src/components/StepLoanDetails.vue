<template>
  <div>
    <h3>Step 2: Loan Details</h3>
    <label for="loan_amount">Loan Amount</label>
    <input
      id="loan_amount"
      v-model.number="internalValue.loan_amount"
      type="number"
    />

    <label for="loan_term">Loan Term (Months)</label>
    <input
      id="loan_term"
      v-model.number="internalValue.loan_term"
      type="number"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

watch(internalValue, newVal => emit('update:modelValue', newVal))
</script>

<style scoped>
/* Add some basic styles */
</style>
