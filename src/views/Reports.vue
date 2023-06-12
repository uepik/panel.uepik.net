<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import DashboardOverlay from '@/components/DashboardOverlay.vue'

const router = useRouter()
const store = useStore()

const userForm = reactive({ ...store.getters.user })
const companyForm = reactive({ ...store.getters.company })
const transactions = computed(() => store.getters.transactions)

const uid = store.getters.user._id

// const filtered = {a:1}

const dates = reactive({
  from: '',
  to: ''
})

// Filter by dates
const filterByDates = (transactions, from, to) => {
  return transactions.filter(item => {
    const transactionsDate = new Date(item.operationDate);
    return (transactionsDate >= new Date(from) && transactionsDate <= new Date(to));
  })
}

const filtered = () => {
  // console.log(transactions.value)
  console.log(
    filterByDates(transactions.value, dates.from, dates.to)
  )
}
</script>

<template>
  <DashboardOverlay>
    <v-row>
      <v-col>
        <h2 class="text-h4 view-title">Przeglądarka raportów</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="6" sm="12">
        <v-card>
          <v-card-title>Bilans finansowy</v-card-title>
          <v-card-text>
            <p>
              Raport umożliwia bieżące monitorowanie i analizę przychodów oraz kosztów w okresie określonym poniżej, umożliwiając Ci skuteczne zarządzanie budżetem i optymalizację finansową.
            </p>

            <v-row class="mt-4 mb-1">
              <v-col md="6" sm="12">

                <v-text-field
                  type="date"
                  label="Data początkowa"
                  hide-details
                  v-model="dates.from"
                />

              </v-col>
              <v-col md="6" sm="12">

                <v-text-field
                  type="date"
                  label="Data końcowa"
                  hide-details
                  v-model="dates.to"
                />

              </v-col>
            </v-row>

            <v-btn
              id="download-activator"
              color="primary"
              block
              append-icon="mdi-chevron-down"
            >
              Pobierz w wybranym formacie
            </v-btn>

            <v-menu activator="#download-activator">
              <v-list elevation="1">
                <v-list-item link>
                  <v-list-item-title>Plik PDF</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title>Arkusz kalkulacyjny (.xlsx)</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col><div style="font-family:monospace !important;font-size:14px;">
        {{ () => filterByDates(transactions.value, dates.from, dates.to) }}
      </div>
      
      <v-btn @click="filtered">Filtruj i konsoluj</v-btn>
      </v-col>
    </v-row>

  </DashboardOverlay>
</template>
