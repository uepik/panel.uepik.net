<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isDialogOpen = ref(false)
const tab = ref(null)

const form = reactive({
  invoiceNumber: '',
  operationDate: '',
  description: '',
  isIncome: null,
  contractor: {
    nip: '',
    name: '',
    address: '',
    zipCode: '',
    location: ''
  },
  income: {
    charity: 0,
    noCharity: 0,
    other: 0
  },
  revenue: {
    deductible: 0,
    ineligible: 0
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
      alert('dodano')

      // fetch all transactions to store
      store.dispatch('getTransactions')
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
          label="Data zdarzenia lub operacji"
          type="date"
          v-model="form.operationDate" />

        <v-radio-group inline v-model="form.isIncome">
          <v-radio label="Przychód" :value="true" class="mr-5"/>
          <v-radio label="Koszt" :value="false" />
        </v-radio-group>
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

    <template v-if="form.isIncome">
      <p class="font-weight-medium mb-3 mt-6">Przychody określone w art. 10a ust. 1 pkt 4 lit. a-d ustawy o działalności pożytku publicznego i o wolontariacie</p>
      <v-row>
        <v-col md="4" sm="12">
          <v-text-field
            label="Działalność nieodpłatna"
            hint="Przychody z działalności nieodpłatnej pożytku publicznego"
            persistent-hint
            suffix="zł"
            v-model.number="form.income.charity" />
        </v-col>
        <v-col md="4" sm="12">
          <v-text-field
            label="Działalność odpłatna"
            hint="Przychody z działalności odpłatnej pożytku publicznego z tytułu sprzedaży towarów i usług"
            persistent-hint
            suffix="zł"
            v-model.number="form.income.noCharity" />
        </v-col>
        <v-col md="4" sm="12">
          <v-text-field
            label="Pozostałe przychody"
            suffix="zł"
            v-model.number="form.income.other" />
        </v-col>
      </v-row>
    </template>
    <template v-if="form.isIncome === false">
      <p class="font-weight-medium mb-3 mt-6">Koszty</p>
      <v-row>
        <v-col md="3" sm="12">
          <v-text-field
            label="Koszty uzyskania przychodów"
            suffix="zł"
            v-model.number="form.revenue.deductible" />
        </v-col>
        <v-col md="3" sm="12">
          <v-text-field
            label="Koszty niekwalifikowane"
            hint="Koszty niestanowiące uzyskania przychodów"
            persistent-hint
            suffix="zł"
            v-model.number="form.revenue.ineligible" />
        </v-col>
      </v-row>
    </template>

    <v-btn @click="addTransaction" class="mt-7" color="gray">Dodaj nową transakcję</v-btn>

  </v-form>
</template>