<script setup >
import DashboardOverlay from '@/components/DashboardOverlay.vue'
import AddTransaction from '@/components/AddTransaction.vue'
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const incomesPreview = [
  { lp: 1, sum: 33.31, company: 'X-KOM Sp. z o.o.'},
  { lp: 2, sum: 84.25, company: 'Auchan Sp. k.'},
  { lp: 3, sum: 11.76, company: 'Carrefour Sp. k.'},
  { lp: 4, sum: 311.76, company: 'Biedronka Sp. z o.o.'},
  { lp: 5, sum: 33.31, company: 'X-KOM Sp. z o.o.'},
  { lp: 6, sum: 84.25, company: 'Auchan Sp. k.'},
  { lp: 7, sum: 11.76, company: 'Carrefour Sp. k.'}
]

const tab = ref('one')

const transactions = reactive({ ...store.getters.transactions })
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
        <v-card>
          
          <v-tabs
            v-model="tab"
            variant="tonal"
          >
            <v-tab value="summary">
              <v-icon class="mr-3">mdi-format-list-text</v-icon> Zestawienie transakcji</v-tab>
            <v-tab value="new-transaction">
              <v-icon class="mr-3">mdi-paperclip-plus</v-icon> Nowa transakcja
            </v-tab>
            <v-tab value="export">
              <v-icon class="mr-3">mdi-file-excel-outline</v-icon> Eksportuj dane
            </v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="summary">
                <v-card-text>
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
                        v-for="item in transactions"
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
                        <td>{{ item.createdAt }}</td>
                        <td><v-chip size="small" link>{{ item.contractor.name }}</v-chip></td>
                        <td>
                          <v-chip size="x-small" link>
                            <v-icon class="mr-2">mdi-eye-outline</v-icon>
                            {{ item.invoiceNumber }}
                          </v-chip>
                        </td>
                        <td>
                          <v-icon>mdi-eye-outline</v-icon>
                          <v-icon class="mx-1">mdi-pencil-outline</v-icon>
                          <v-icon>mdi-delete-outline</v-icon>
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-card-text>
              </v-window-item>

              <v-window-item value="new-transaction">
                <AddTransaction />
              </v-window-item>

              <v-window-item value="export">
                <p>Export to PDF / Google Sheets</p>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </DashboardOverlay>
</template>
