<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import DashboardOverlay from '@/components/DashboardOverlay.vue'
import AddTransaction from '@/components/AddTransaction.vue'
import FinancesSummary from '@/components/FinancesSummary.vue'
import FinancesTable from '@/components/FinancesTable.vue'

const store = useStore()
const uid = store.getters.user._id
const transactions = computed(() => store.getters.transactions)

const tab = ref('summary')
const alert = ref({
  isVisible: false,
  type: undefined,
  message: undefined
})

const showAlert = (type, message) => {
  alert.value = {
    isVisible: true,
    type,
    message
  }

  setTimeout(() => {
    alert.value.isVisible = false
  }, 5000);
}

const checkIsAnyTransaction = () => Object.keys(transactions).length > 0

const handleDeleteTransaction = (id) => {
  const isConfirmed = confirm('Czy na pewno chcesz usunąć tę transakcję?')

  if (isConfirmed) {
    axios.delete(`/transactions/${uid}/${id}`)
      .then(() => {
        // fetch all transactions to store
        store.dispatch('getTransactions')
        showAlert('info', 'Poprawnie usunięto transakcję.')
      })
      .catch(() => showAlert('error', 'Wystąpił błąd podczas usuwania transkacji. Prosimy o zgłoszenie problemu: uepik@frc.org.pl'))
  }
}

const handleAddedTransaction = () => {
  showAlert('success', 'Dodano nową transakcję.')
  tab.value = 'summary'
  window.scrollTo(0, 0)
}
</script>

<template>
  <DashboardOverlay>
    <template #title>Ewidencja przychodów i kosztów</template>

    <v-row>
      <v-col col="12">
        <v-card class="mb-4">
          <v-tabs v-model="tab" variant="tonal">
            <v-tab value="summary">
              <v-icon class="mr-3">mdi-format-list-text</v-icon> Zestawienie transakcji</v-tab>
            <v-tab value="new-transaction">
              <v-icon class="mr-3">mdi-paperclip-plus</v-icon> Nowa transakcja
            </v-tab>
          </v-tabs>
        </v-card>

        <v-window v-model="tab">
          <v-window-item value="summary">
            <v-row v-if="checkIsAnyTransaction">
              <FinancesSummary :transactions="transactions"/>
            </v-row>

            <v-alert
              v-if="alert.isVisible"
              :type="alert.type"
              :text="alert.message"
              class="mb-4"
            />

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
        </v-window>
      </v-col>
    </v-row>
  </DashboardOverlay>
</template>
