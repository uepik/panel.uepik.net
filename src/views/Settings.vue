<script setup>
import DashboardOverlay from '@/components/DashboardOverlay.vue'
</script>

<template>
  <DashboardOverlay>
    <v-row>
      <v-col md="6" sm="12">
        <v-card>
          <v-card-title>Ustawienia konta</v-card-title>
          <v-card-text>
            <pre>{{ $store.getters.user }}</pre>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="6" sm="12">
        <v-card>
          <v-card-title>Ustawienia firmy</v-card-title>
          <v-card-text>
            <pre>{{ $store.getters.user.company }}</pre>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </DashboardOverlay>
</template>
