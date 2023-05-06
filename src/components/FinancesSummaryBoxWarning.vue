<script setup>
const props = defineProps(['incomes'])
import currencyFormat from '@/helpers/currencyFormat'

const incomeWarnings = [
  {
    status: props.incomes > 90000 && props.incomes < 100000,
    color: 'orange',
    message: `Zbliżasz się do przekroczenia progu przychodów ${ currencyFormat(100000) }.`
  },
  {
    status: props.incomes > 100000,
    color: 'red',
    message: `Przekroczono próg ${ currencyFormat(100000) } przychodu! Rozważ rezygnację z UEPiK.`
  }
]

const isWarning = () => incomeWarnings.filter(item => item.status === true)[0] || null
</script>

<template v-if="isWarning()">
  <v-tooltip :text="isWarning().message" location="bottom">
    <template v-slot:activator="{ props }">
      <v-icon
        v-bind="props"
        icon="mdi-alert"
        size="18"
        :color="isWarning().color"
        class="ml-1"
      ></v-icon>
    </template>
  </v-tooltip>
</template>