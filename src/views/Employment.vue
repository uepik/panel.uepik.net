<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import DashboardOverlay from '@/components/DashboardOverlay.vue'
import EmployeesTable from '@/components/EmployeesTable.vue'

const store = useStore()
const employees = computed(() => store.getters.employees)

const tab = ref('list')
const isAddButtonLoading = ref(false)

const form = reactive({
  firstLastName: undefined,
  pesel: undefined,
  dateFrom: undefined
})

const addEmployer = () => {
  isAddButtonLoading.value = true

  axios.post('/employees', {
    ...form,
    createdAt: Date.now(),
    uid: store.getters.user._id
  })
    .then(() => {
      isAddButtonLoading.value = false
      store.dispatch('getEmployees')
    })
    .catch(error => console.warn(error))
}
</script>

<template>
  <DashboardOverlay>
    <template #title>Zatrudnienie</template>

    <v-row>
      <v-col col="12">
        <v-card class="mb-4">
          <v-tabs v-model="tab" variant="tonal">
            <v-tab value="list">
              <v-icon class="mr-3">mdi-account-group</v-icon> Lista pracowników</v-tab>
            <v-tab value="add-employer">
              <v-icon class="mr-3">mdi-account-multiple-plus</v-icon> Dodaj pracownika
            </v-tab>
          </v-tabs>
        </v-card>

        <v-window v-model="tab">
          <v-window-item value="list">
            <v-card>
              <v-card-title>Lista</v-card-title>
              <v-card-text>
                <EmployeesTable
                  :employees="employees"
                />
              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item value="add-employer">
            <v-card>
              <v-card-title>Dane nowego pracownika</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Imię i nazwisko"
                    autofocus
                    :disabled="isAddButtonLoading"
                    v-model="form.firstLastName" />

                  <v-text-field
                    label="Numer PESEL"
                    :disabled="isAddButtonLoading"
                    v-model="form.pesel" />

                  <v-text-field
                    label="Data zatrudnienia"
                    type="date"
                    :disabled="isAddButtonLoading"
                    v-model="form.dateFrom" />

                  <v-btn
                    @click="addEmployer"
                    class="mt-5"
                    variant="tonal"
                    :loading="isAddButtonLoading"
                  >Dodaj nowego pracownika</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </DashboardOverlay>
</template>
