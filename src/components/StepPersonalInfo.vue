<template>
  <div>
    <h3>Step 1: Personal Information</h3>
    <label for="name">Name</label>
    <input id="name" v-model="internalValue.name" type="text" />

    <label for="email">Email</label>
    <input id="email" v-model="internalValue.email" type="email" />
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
