<script setup>
const props = defineProps(['employees'])
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const search = ref('')

const headers = [
  { title: 'L.p.', align: 'start', key: 'no', sortable: false },
  { title: 'Status', key: 'status' },
  { title: 'Imię i nazwisko', key: 'firstLastName' },
  { title: 'PESEL', key: 'pesel' },
  { title: 'Data zatrudnienia', key: 'dateFrom' },
  { title: 'Akcje', key: 'actions', sortable: false },
]
</script>

<template>
  <v-text-field
    v-model="search"
    label="Wyszukiwarka pracowników"
    placeholder="np. imię, nazwisko, numer PESEL"
    class="mb-2"
    clearable
    hide-details
  ></v-text-field>

  <v-data-table
    :headers="headers"
    :items="props.employees"
    :items-length="props.employees.length"
    :search="search"
    density="comfortable"
  >
    <template #item.no="{ item }">
      {{ Object.keys(props.employees).length - props.employees.indexOf(item.raw) }}
    </template>

    <template #item.status>
      <v-chip
        size="small"
        color="green"
        text-color="white"
      >
        Aktywny
      </v-chip>
    </template>

    <template #item.invoiceNumber="{ item }">
      <v-chip size="small" link>
        <v-icon class="mr-1">mdi-file-document</v-icon>
        <span class="chip__wrapped">{{ item.raw.invoiceNumber }}</span>
      </v-chip>
    </template>

    <template #item.actions="{ item }">
      <v-btn
        density="compact"
        icon="mdi-delete"
        size="small"
        @click="emit('delete', item.raw._id)" />
    </template>
  </v-data-table>
</template>

<style>
</style>