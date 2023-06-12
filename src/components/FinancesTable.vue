<script setup>
const props = defineProps(['transactions'])
const emit = defineEmits(['delete'])
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import isIncome from '@/helpers/isIncome'
import currencyFormat from '@/helpers/currencyFormat'

const search = ref('')

const headers = [
  { title: 'L.p.', align: 'start', key: 'no', sortable: false },
  { title: 'Rodzaj', key: 'category' },
  { title: 'Data operacji', key: 'operationDate' },
  { title: 'Kwota', key: 'value' },
  { title: 'Kontrahent', key: 'contractor' },
  { title: 'Numer dokumentu', key: 'invoiceNumber', sortable: false },
  { title: 'Akcje', key: 'actions', sortable: false },
]

const getChipValues = (category) => {
  if (isIncome(category)) return { color: 'green-lighten-1', icon: 'mdi-plus', title: 'Przychód' }
  else return { color: 'red-lighten-1', icon: 'mdi-minus', title: 'Koszt' }
}

const replaceContractorObj = (arr) => arr.map((item) => ({
 ...item,
  contractor: item.contractor.name
}))

const searchBy = (company) => search.value = company
</script>

<template>
  <v-text-field
    v-model="search"
    label="Wyszukiwarka transakcji"
    placeholder="np. rok lub data operacji, kontrahent, numer dokumentu"
    class="mb-2"
    clearable
    hide-details
  ></v-text-field>

  <v-data-table
    :headers="headers"
    :items="replaceContractorObj(props.transactions)"
    :items-length="props.transactions.length"
    :search="search"
    density="comfortable"
  >
    <template #item.no="{ item }">
      {{ Object.keys(props.transactions).length - props.transactions.indexOf(item.raw) }}
    </template>

    <template #item.category="{ item }">
      <v-chip
        :set="chip = getChipValues(item.raw.category)"
        size="x-small" variant="elevated"
        :color="chip.color"
      >
        <v-icon>{{ chip.icon }}</v-icon>
        {{ chip.title }}
      </v-chip>
    </template>

    <template #item.value="{ item }">
      {{ currencyFormat(item.raw.value) }}
    </template>

    <template #item.contractor="{ item }">
      <v-chip size="small" link @click="searchBy(item.raw.contractor)">
        <span class="chip__wrapped">
          {{ item.raw.contractor }}
        </span>

        <v-tooltip
          activator="parent"
          location="top"
        >{{ item.raw.contractor }}</v-tooltip>
      </v-chip>
    </template>

    <template #item.invoiceNumber="{ item }">
      <v-chip size="small" link @click="searchBy(item.raw.invoiceNumber)">
        <span class="chip__wrapped">{{ item.raw.invoiceNumber }}</span>
      </v-chip>
    </template>

    <template #item.actions="{ item }">
      <v-btn
        density="compact"
        icon="mdi-delete"
        size="small"
        @click="emit('delete', item.raw._id)"
      />
    </template>
  </v-data-table>
</template>

<style>
.chip__wrapped {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>