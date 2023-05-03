<script setup>
const props = defineProps(['title', 'value'])
</script>

<template>
  <v-col md="4" sm="12">
    <v-card class="mb-4">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text class="text-h6 font-weight-regular">{{ value }}</v-card-text>
    </v-card>
  </v-col>
</template>