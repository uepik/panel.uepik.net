<script setup>
const props = defineProps(['transactions'])
const emit = defineEmits(['delete'])

const moneyFormatter = (value) => {
  const options = { style: 'currency', currency: 'PLN' }
  return value.toLocaleString('pl-PL', options)
}
</script>

<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          L.p.
        </th>
        <th class="text-left">
          Rodzaj
        </th>
        <th class="text-left">
          Data
        </th>
        <th class="text-left">
          Kwota
        </th>
        <th class="text-left">
          Kontrahent
        </th>
        <th class="text-left">
          Podgląd dokumentu
        </th>
        <th class="text-left">
          Akcje
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in props.transactions"
        :key="item._id"
      >
        <td>lp</td>
        <td>
          <v-chip
            size="x-small" variant="elevated"
            :color="item.isIncome ? 'green-lighten-1' : 'red-lighten-1'"
          >
            <v-icon>{{ item.isIncome ? 'mdi-plus' : 'mdi-minus' }}</v-icon>
            {{ item.isIncome ? 'Przychód' : 'Koszt' }}
          </v-chip>

        </td>
        <td>{{ new Date(item.createdAt).toLocaleDateString() }}</td>
        <td>
          {{ item.isIncome ? moneyFormatter(item.income.sum) : `-${ moneyFormatter(item.revenue.deductible + item.revenue.ineligible) }` }}
        </td>
        <td>
          <v-chip size="small" link>
            <span class="chip__wrapped">{{ item.contractor.name }}</span>
          </v-chip>
        </td>
        <td>
          <v-chip size="x-small" link>
            <v-icon class="mr-2">mdi-eye-outline</v-icon>
            {{ item.invoiceNumber }}
          </v-chip>
        </td>
        <td>
          <v-btn
            density="compact"
            icon="mdi-delete"
            size="small"
            @click="emit('delete', item._id)" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style>
.chip__wrapped {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>