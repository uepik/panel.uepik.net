<script setup>
import DashboardOverlay from '@/components/DashboardOverlay.vue'
import Simplified from '@/components/reports/Simplified.vue'
</script>

<template>
  <DashboardOverlay>
    <v-row>
      <v-col>
        <h2 class="text-h4 view-title">Przeglądarka raportów</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="6" sm="12">
        <Simplified />
      </v-col>
    </v-row>

  </DashboardOverlay>
</template>
