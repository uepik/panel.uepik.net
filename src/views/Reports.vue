<script setup>
import DashboardOverlay from '@/components/DashboardOverlay.vue'
import Simplified from '@/components/reports/Simplified.vue'
import FinancialFlows from '@/components/reports/FinancialFlows.vue'
</script>

<template>
  <DashboardOverlay>
    <template #title>Przeglądarka raportów</template>

    <v-row>
      <v-col md="6" sm="12">
        <Simplified />
      </v-col>
      <v-col md="6" sm="12">
        <FinancialFlows />
      </v-col>
    </v-row>

  </DashboardOverlay>
</template>
