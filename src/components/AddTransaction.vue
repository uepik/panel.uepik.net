<script setup>
import { ref, reactive, defineEmits } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const emit = defineEmits(['added'])
const tab = ref(null)

const items = [
  { title: 'Przychody z działalności nieodpłatnej pożytku publicznego', type: 'income_charity' },
  { title: 'Przychody z działalności odpłatnej pożytku publicznego z tytułu sprzedaży towarów i usług', type: 'income_noCharity' },
  { title: 'Pozostałe przychody', type: 'income_other' },
  { title: 'Koszty uzyskania przychodów', type: 'revenue_deductible' },
  { title: 'Koszty niestanowiące uzyskania przychodów', type: 'revenue_ineligible' },
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
  // isRegisterButtonLoading.value = true

  // if (!isAccountCreated.value) { // allow 1 register in session, needs improve on backend
    const createUserQuery = await fetch('http://localhost:3030/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        createdAt: Date.now(),
        uid: store.getters.user._id
      }),
    })
    
    if (await createUserQuery.json()) {
      // isRegisterButtonLoading.value = false
      // isAccountCreated.value = true
      // alert('dodano')

      // fetch all transactions to store
      store.dispatch('getTransactions')
        .then(() => emit('added'))
    }
  // }
}

let isContractorFetching = ref(false)
const fetchContractorByNIP = async () => {
  isContractorFetching.value = true

  const query = await fetch(`http://localhost:3030/companyByNIP/${form.contractor.nip}`)
  const response = await query.json()

  if (response) {
    form.contractor = response
    isContractorFetching.value = false
  }
}
</script>

<template>
  <v-form class="pa-5">

    <p class="font-weight-medium mb-4">Dane transakcji</p>
    <v-row>
      <v-col md="4" sm="12">
        <v-text-field
          label="Numer dokumentu księgowego"
          autofocus
          v-model="form.invoiceNumber" />

        <v-text-field
          label="Data operacji"
          type="date"
          v-model="form.operationDate" />
      </v-col>
      <v-col md="8" sm="12">
        <v-textarea
          label="Opis transakcji"
          clearable
          no-resize
          rows="2"
          no-gutters
          v-model="form.description" />

        <v-file-input
          show-size
          counter
          label="Wgraj dokument księgowy"
          variant="outlined"
        ></v-file-input>
      </v-col>
    </v-row>

    <p class="font-weight-medium mb-3 mt-6">Dane kontrahenta</p>
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

    <p class="font-weight-medium mb-3 mt-6">Wartość</p>
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

    <v-btn @click="addTransaction" class="mt-7" color="gray">Dodaj nową transakcję</v-btn>

  </v-form>
</template>