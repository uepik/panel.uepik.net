<script setup >
import DashboardOverlay from '@/components/DashboardOverlay.vue'
import AddTransaction from '@/components/AddTransaction.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import FinancesSummary from '../components/FinancesSummary.vue'
import FinancesTable from '../components/FinancesTable.vue'

const store = useStore()
const uid = store.getters.user._id

const transactions = computed(() => store.getters.transactions)
const tab = ref('summary')
const isAddConfirmationVisible = ref(false)

const checkIsAnyTransaction = () => Object.keys(transactions).length > 0

const handleDeleteTransaction = async (id) => {
  const deleteQuery = await fetch(`http://localhost:3030/transactions/${uid}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })

  if (await deleteQuery.text()) {
    // fetch all transactions to store
    store.dispatch('getTransactions')
    tab.value = 'summary'
  }
}

const handleAddedTransaction = () => {
  isAddConfirmationVisible.value = true
  tab.value = 'summary'
  window.scrollTo(0, 0)
}
</script>

<template>
  <DashboardOverlay>
    <v-row>
      <v-col>
        <h2 class="text-h4 view-title">Ewidencja przychodów i kosztów</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col col="12">
        <v-card class="mb-4">
          <v-tabs v-model="tab" variant="tonal">
            <v-tab value="summary">
              <v-icon class="mr-3">mdi-format-list-text</v-icon> Zestawienie transakcji</v-tab>
            <v-tab value="new-transaction">
              <v-icon class="mr-3">mdi-paperclip-plus</v-icon> Nowa transakcja
            </v-tab>
            <v-tab value="export">
              <v-icon class="mr-3">mdi-file-excel-outline</v-icon> Eksportuj dane
            </v-tab>
          </v-tabs>
        </v-card>

        <v-window v-model="tab">
          <v-window-item value="summary">
            <v-row v-if="checkIsAnyTransaction">
              <FinancesSummary :transactions="transactions"/>
            </v-row>

            <v-alert
              v-if="isAddConfirmationVisible"
              type="success"
              closable
              close-label="Zamknij informację"
              class="mb-4"
            >
              Dodano nową transakcję.
            </v-alert>

            <v-card>
              <v-card-title>Zestawienie transakcji w 2023 r.</v-card-title>
              <v-card-text>
                <template v-if="checkIsAnyTransaction">
                  <FinancesTable
                    :transactions="transactions"
                    @delete="handleDeleteTransaction"
                  />
                </template>
                <v-alert v-if="!checkIsAnyTransaction" type="info">
                  Brak dodanych transakcji. Przejdź do zakładki <b>Nowa transakcja</b>, aby utworzyć pierwszą.
                </v-alert>
              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item value="new-transaction">
            <v-card>
              <v-card-title>Nowa transakcja</v-card-title>
              <v-card-text>
                <AddTransaction
                  @added="handleAddedTransaction" />
              </v-card-text>
            </v-card>
            
          </v-window-item>

          <v-window-item value="export">
            <v-row>
              <v-col md="6" sm="12">
                <v-card>
                  <v-card-title>Exportuj do pliku <code>.xlsx</code></v-card-title>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident nemo voluptatibus praesentium expedita molestias.
                    Magnam obcaecati quidem, necessitatibus sint nulla quae
                    mollitia nam maiores. Vel quam vero totam accusamus labore.
                  </v-card-text>
                  <v-card-actions>
                    <v-btn block>
                      Eksportuj
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
            
      </v-col>

    </v-row>
  </DashboardOverlay>
</template>
