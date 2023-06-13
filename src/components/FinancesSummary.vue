<script setup>
const props = defineProps(['transactions'])

import FinancesSummaryBox from '@/components/FinancesSummaryBox.vue'
import sumByCategory from '@/helpers/sumByCategory'
</script>

<template>
  <FinancesSummaryBox
    title="Przychody"
    :value="sumByCategory(transactions, 'income')" />

  <FinancesSummaryBox
    title="Koszty"
    :value="sumByCategory(transactions, 'revenue')" />

  <FinancesSummaryBox
    title="Zysk (strata)"
    :value="sumByCategory(transactions, 'income') - sumByCategory(transactions, 'revenue')" />
</template>