<script setup >
import DashboardOverlay from '@/components/DashboardOverlay.vue'

const incomesPreview = [
  { lp: 1, sum: 33.31, company: 'X-KOM Sp. z o.o.'},
  { lp: 2, sum: 84.25, company: 'Auchan Sp. k.'},
  { lp: 3, sum: 11.76, company: 'Carrefour Sp. k.'},
  { lp: 4, sum: 311.76, company: 'Biedronka Sp. z o.o.'},
  { lp: 5, sum: 33.31, company: 'X-KOM Sp. z o.o.'},
  { lp: 6, sum: 84.25, company: 'Auchan Sp. k.'},
  { lp: 7, sum: 11.76, company: 'Carrefour Sp. k.'}
]
</script>

<template>
  <DashboardOverlay>
    <v-row>
      <v-col md="4" sm="12">
        <v-card>
          <v-card-title>Podsumowanie przychodów</v-card-title>
          <v-card-text>
            <p class="text-h4">+1431,78 PLN</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4" sm="12">
        <v-card>
          <v-card-title>Podsumowanie kosztów</v-card-title>
          <v-card-text>
            <p class="text-h4">-302,29 PLN</p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4" sm="12">
        <v-card>
          <v-card-title>Bilans</v-card-title>
          <v-card-text>
            <p class="text-h4">+1129,49 PLN</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Przychody -->
      <v-col md="6" sm="12">
        <v-card>
          <v-card-title>Ostatnio dodane przychody</v-card-title>
          <v-card-text>
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">
                    L.p.
                  </th>
                  <th class="text-left">
                    Kwota
                  </th>
                  <th class="text-left">
                    Kontrahent
                  </th>
                  <th class="text-left">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in incomesPreview"
                  :key="item.lp"
                >
                  <td>{{ item.lp }}</td>
                  <td>{{ item.sum }}</td>
                  <td>{{ item.company }}</td>
                  <td>
                    <v-icon>mdi-eye-outline</v-icon>
                    <v-icon class="mx-1">mdi-pencil-outline</v-icon>
                    <v-icon>mdi-delete-outline</v-icon>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <v-btn class="mt-5">Przejdź do panelu przychodów</v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Koszty -->
      <v-col md="6" sm="12">
        <v-card>
          <v-card-title>Ostatnio dodane koszty</v-card-title>
          <v-card-text>
            <v-table density="compact">
              <thead>
                <tr>
                  <th class="text-left">
                    L.p.
                  </th>
                  <th class="text-left">
                    Kwota
                  </th>
                  <th class="text-left">
                    Kontrahent
                  </th>
                  <th class="text-left">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in incomesPreview.reverse()"
                  :key="item.lp"
                >
                  <td>{{ item.lp }}</td>
                  <td>{{ item.sum }}</td>
                  <td>{{ item.company }}</td>
                  <td>
                    <v-icon>mdi-eye-outline</v-icon>
                    <v-icon class="mx-1">mdi-pencil-outline</v-icon>
                    <v-icon>mdi-delete-outline</v-icon>
                  </td>
                </tr>
              </tbody>
            </v-table>

            <v-btn class="mt-5">Przejdź do panelu kosztów</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </DashboardOverlay>
</template>
