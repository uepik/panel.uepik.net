<script setup>
import { ref, reactive, defineEmits } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios';

const store = useStore()
const emit = defineEmits(['added'])
const isAddButtonLoading = ref(false)
const isContractorFetching = ref(false)

const items = [
  {
    title: 'Przychody z działalności nieodpłatnej pożytku publicznego',
    type: 'income_charity'
  },
  {
    title: 'Przychody z działalności odpłatnej pożytku publicznego z tytułu sprzedaży towarów i usług',
    type: 'income_noCharity'
  },
  {
    title: 'Pozostałe przychody',
    type: 'income_other'
  },
  {
    title: 'Koszty uzyskania przychodów',
    type: 'revenue_deductible'
  },
  {
    title: 'Koszty niestanowiące uzyskania przychodów',
    type: 'revenue_ineligible'
  }
]

const form = reactive({
  invoiceNumber: '',
  operationDate: undefined,
  description: '',
  category: undefined,
  value: undefined,
  contractor: {
    nip: '',
    name: '',
    address: '',
    zipCode: '',
    location: ''
  }
})

const addTransaction = async () => {
  isAddButtonLoading.value = true

  axios.post('/transactions', {
    ...form,
    createdAt: Date.now(),
    uid: store.getters.user._id
  })
    .then(() => {
      isAddButtonLoading.value = false

      store.dispatch('getTransactions')
        .then(() => emit('added'))
    })
    .catch(error => console.warn(error))
}

const fetchContractorByNIP = async () => {
  isContractorFetching.value = true

  axios.get(`/companyByNIP/${form.contractor.nip}`)
    .then(response => {
      form.contractor = response.data
      isContractorFetching.value = false
    })
    .catch(error => console.warn(error))
}
</script>

<template>
  <v-form class="pa-5">

    <p class="font-weight-medium mb-4">Dane transakcji</p>
    <v-row>
      <v-col md="4" sm="12">
        <v-text-field
          label="Numer dowodu księgowego"
          autofocus
          v-model="form.invoiceNumber" />

        <v-text-field
          label="Data zdarzenia lub operacji"
          type="date"
          v-model="form.operationDate" />
      </v-col>
      <v-col md="8" sm="12">
        <v-textarea
          label="Opis zdarzenia"
          clearable
          no-resize
          rows="2"
          no-gutters
          v-model="form.description" />
      </v-col>
    </v-row>

    <p class="font-weight-medium mb-3 mt-6">Dane kontrahenta lub innego podmiotu</p>
    <v-row>
      <v-col md="6" sm="12">
        <div class="d-flex align-center">
          <v-text-field
            label="NIP kontrahenta"
            v-model.number="form.contractor.nip" />

          <v-btn 
            @click="fetchContractorByNIP"
            :loading="isContractorFetching"
            variant="tonal"
            class="ml-3 mb-6">Uzupełnij automatycznie po NIP-ie</v-btn>
        </div>

        <v-text-field
          label="Nazwa kontrahenta"
          :disabled="isContractorFetching"
          v-model="form.contractor.name" />
      </v-col>

      <v-col md="6" sm="12">
        <v-text-field
          label="Ulica i numer lokalu"
          :disabled="isContractorFetching"
          v-model="form.contractor.address" />
          
          <v-row>
            <v-col md="6" sm="12">
              <v-text-field
                label="Kod pocztowy"
                :disabled="isContractorFetching"
                v-model="form.contractor.zipCode" />
            </v-col>
            <v-col md="6" sm="12">
              <v-text-field
                label="Miejscowość"
                :disabled="isContractorFetching"
                v-model="form.contractor.location" />
            </v-col>
          </v-row>
      </v-col>
    </v-row>

    <p class="font-weight-medium mb-3 mt-6">
      <span class="mr-2">Wartość transakcji</span>

      <v-tooltip text="Przychody muszą zawierać się w określonych w art. 10a ust. 1 pkt 4 lit. a-d ustawy o działalności pożytku publicznego i o wolontariacie.">
        <template #activator="{ props }">
          <v-icon v-bind="props" class="text-disabled">mdi-help-circle</v-icon>
        </template>
      </v-tooltip>
    </p>
    <v-row>
      <v-col md="5" sm="12">
        <v-select
          v-model="form.category"
          label="Kategoria transakcji"
          item-title="title"
          item-value="type"
          :items="items"
        ></v-select>
      </v-col>

      <v-col md="3" sm="12">
        <v-text-field
          label="Kwota transakcji"
          suffix="zł"
          v-model.number="form.value" />
      </v-col>
    </v-row>

    <v-btn
      @click="addTransaction"
      class="mt-7"
      color="gray"
      :loading="isAddButtonLoading"
    >Dodaj nową transakcję</v-btn>

  </v-form>
</template>