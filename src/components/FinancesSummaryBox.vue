<script setup>
const props = defineProps(['type', 'value'])
</script>

<template>
  <v-col md="4" sm="12">
    <v-card class="mb-4">
      <v-card-title>{{ props.type }}</v-card-title>
      <v-card-text>{{ props.value }}</v-card-text>
    </v-card>
  </v-col>
</template>