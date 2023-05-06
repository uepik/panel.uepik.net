<script setup>
const props = defineProps(['title', 'value'])
import currencyFormat from '@/helpers/currencyFormat'
import FinancesSummaryBoxWarning from '@/components/FinancesSummaryBoxWarning.vue'
</script>

<template>
  <v-col md="4" sm="12">
    <v-card class="mb-4">
      <v-card-title class="mb-0">{{ title }}</v-card-title>
      <v-card-text class="text-h6 font-weight-regular">
        {{ currencyFormat(value) }}

        <template v-if="props.title === 'Przychody' && props.value > 90000">
          <FinancesSummaryBoxWarning :incomes="props.value" :key="props.value" />
        </template>
      </v-card-text>
    </v-card>
  </v-col>
</template>