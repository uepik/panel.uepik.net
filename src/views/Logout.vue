<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

logout()
</script>

<template>
  <v-container>
    panel wylogowania
  </v-container>
</template>

<style scoped>
</style>
