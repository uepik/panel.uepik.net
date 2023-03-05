<script>
import { ref } from 'vue'

const cardText = ref(`Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Commodi, ratione debitis quis est labore voluptatibus! Eaque
  cupiditate minima, at placeat totam, magni doloremque veniam
  neque porro libero rerum unde voluptatem!`)
</script>

<template>
  <v-card title="Card title" text="Lorem ipsum dolor sit amet consectetur adipisicing elit.
  Commodi, ratione debitis quis est labore voluptatibus! Eaque
  cupiditate minima, at placeat totam, magni doloremque veniam
  neque porro libero rerum unde voluptatem!">
    <v-card-actions>
      <v-btn>Click me</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
</style>
