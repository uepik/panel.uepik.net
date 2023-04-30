<script setup>
const props = defineProps(['type', 'transactionsArr'])
import currencyFormat from '@/helpers/currencyFormat'

const getSumByTransactionType = (arr, isTransactionIncome) => {
  console.log(arr)
  const filteredArr = arr.filter(transaction => transaction.isIncome === isTransactionIncome)
  
  if (filteredArr.length > 1) {
    if (isTransactionIncome === true) {
      return filteredArr.reduce((previous, next) => previous.income.sum + next.income.sum)
    }
    
    if (isTransactionIncome === false) {
      return filteredArr.reduce((previous, next) => previous.revenue.sum + next.revenue.sum)
    }
  }
  else if (filteredArr.length === 1) {
    return isTransactionIncome === true ? filteredArr[0].income.sum : filteredArr[0].revenue.sum
  }
  else {
    return 0
  }
}

const summary = [
  {
    type: 'income',
    title: 'Przychody',
    value: getSumByTransactionType(props.transactionsArr, true)
  },
  {
    type: 'revenue',
    title: 'Koszty',
    value: getSumByTransactionType(props.transactionsArr, false)
  },
  {
    type: 'balance',
    title: 'Zysk (strata)',
    value: getSumByTransactionType(props.transactionsArr, true) - getSumByTransactionType(props.transactionsArr, false)
  }
]
</script>

<template>
  <v-col md="4" sm="12">
    <v-card class="mb-4">
      <v-card-title>{{ (summary.filter(item => item.type === props.type)[0]).title }}</v-card-title>
      <v-card-text>{{ currencyFormat(summary.filter(item => item.type === props.type)[0].value) }}</v-card-text>
    </v-card>
  </v-col>
</template>