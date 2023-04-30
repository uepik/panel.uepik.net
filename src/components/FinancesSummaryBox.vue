<script setup>
const props = defineProps(['type', 'transactionsArr'])
import currencyFormat from '@/helpers/currencyFormat'

const getSumByTransactionType = (type) => {
  const arr = props.transactionsArr

  const filteredArr = arr.filter(transaction => transaction.category.includes(type))
  
  if (filteredArr.length > 1) {
    return filteredArr.reduce((previous, next) => previous.value + next.value)
  }
  else if (filteredArr.length === 1) {
    return filteredArr[0].value
  }
  else {
    return 0
  }
}

const summary = [
  {
    type: 'income',
    title: 'Przychody',
    value: getSumByTransactionType('income')
  },
  {
    type: 'revenue',
    title: 'Koszty',
    value: getSumByTransactionType('revenue')
  },
  {
    type: 'balance',
    title: 'Zysk (strata)',
    value: getSumByTransactionType('income') - getSumByTransactionType('revenue')
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