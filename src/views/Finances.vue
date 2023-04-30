<script setup >
import DashboardOverlay from '@/components/DashboardOverlay.vue'
import AddTransaction from '@/components/AddTransaction.vue'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const tab = ref('one')

const transactions = reactive({ ...store.getters.transactions })

const moneyFormatter = (value) => value.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
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
            <v-card>
              <v-card-title>Zestawienie transakcji w 2023 r.</v-card-title>
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
                        Data
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
                      <td>{{ new Date(item.createdAt).toLocaleDateString() }}</td>
                      <td>
                        {{ item.isIncome ? moneyFormatter(item.income.sum) : `-${ moneyFormatter(item.revenue.deductible + item.revenue.ineligible) }` }}
                      </td>
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
            </v-card>
          </v-window-item>

          <v-window-item value="new-transaction">
            <v-card>
              <v-card-title>Nowa transakcja</v-card-title>
              <v-card-text>
                <AddTransaction />
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

                    <v-btn
                      block
                    >Eksportuj</v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
            
      </v-col>

    </v-row>
  </DashboardOverlay>
</template>
