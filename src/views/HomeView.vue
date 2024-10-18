<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import LoanList from '../components/LoanList.vue' // Import LoanList component
</script>

<template>
  <main>
    <TheWelcome />
    <LoanList />
    <LoanForm />
    <!-- Add LoanList component here -->
  </main>
</template>
