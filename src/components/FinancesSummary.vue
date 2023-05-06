<script setup>
const props = defineProps(['transactions'])

import FinancesSummaryBox from '@/components/FinancesSummaryBox.vue'

const getSum = (transactionsArray, transactionCategory) => {
  const filteredArray = transactionsArray.filter(transaction => transaction.category.includes(transactionCategory))
  const mappedArray = filteredArray.map(item => item.value)

  return mappedArray.reduce((previous, next) => previous + next, 0)
}
</script>

<template>
  <FinancesSummaryBox
    title="Przychody"
    :value="getSum(props.transactions, 'income')" />

  <FinancesSummaryBox
    title="Koszty"
    :value="getSum(transactions, 'revenue')" />

  <FinancesSummaryBox
    title="Zysk (strata)"
    :value="getSum(transactions, 'income') - getSum(transactions, 'revenue')" />
</template>