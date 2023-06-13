<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { usePDF } from 'vue3-pdfmake'
import currencyFormat from '@/helpers/currencyFormat'

const store = useStore()
const pdf = usePDF()

const user = reactive({ ...store.getters.user })
const company = reactive({ ...store.getters.company })
const transactions = computed(() => store.getters.transactions)

const dates = reactive({
  from: '',
  to: ''
})

// Filter by dates
const filterByDates = (transactions, from, to) => {
  return transactions.filter(item => {
    const transactionsDate = new Date(item.operationDate)
    return (transactionsDate >= new Date(from) && transactionsDate <= new Date(to))
  })
}

// Sum by category
const sumByCategory = (arr, category) => {
  const filtered = arr.filter(item => item.category === category).reduce((acc, next) => acc + next.value, 0)
  return currencyFormat(filtered || 0)
}

const count = (category) => {
  const array = filterByDates(transactions.value, dates.from, dates.to)
  return sumByCategory(array, category)
}

// PDF
const downloadPDF = () => {
  pdf.createPdf({
    content: [
      {
        // Header
        stack: [
          `Podsumowanie finansowe`,
          { text: company.name, style: 'subheader' },
        ],
        style: 'header'
      },
      {
        text: [
          `Podsumowanie dotyczy okresu od `,
          { text: dates.from, bold: true },
          ` do `,
          { text: dates.to, bold: true }
        ],
        margin: [0, 0, 0, 30]
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          body: [
            [ 'Kategoria', 'Wartość'],
            [
              'Przychody z działalności nieodpłatnej pożytku publicznego',
              count('income_charity')
            ],
            [
              'Przychody z działalności odpłatnej pożytku publicznego z tytułu sprzedaży towarów i usług',
              count('income_noCharity')
            ],
            [
              'Pozostałe przychody',
              count('income_other')
            ],
            [
              'Koszty uzyskania przychodów',
              count('revenue_deductible')
            ],
            [
              'Koszty niestanowiące uzyskania przychodów',
              count('revenue_ineligible')
            ]
          ]
        }
      },
      {
        // Footer
        text: `Wygenerowano ${ new Date().toLocaleString('pl-PL') } przez ${ user.firstLastName } (${ user.email })`,
        style: 'footer'
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        // [left, top, right, bottom]
        margin: [0, 0, 0, 30]
      },
      subheader: {
        fontSize: 14
      },
      footer: {
        fontSize: 8,
        italics: true,
        margin: [0, 90, 0, 0]
      }
    }
  }).download(`Podsumowanie finansowe ${ dates.from }_${ dates.to }.pdf`);
}

const insertDate = (range) => {
  const date = new Date()

  switch (range) {
    case 'day':
      dates.from = dates.to = dateFormatter(new Date())
      break
    case 'month':
      dates.from = dateFormatter(new Date(date.getFullYear(), date.getMonth(), 1))
      dates.to = dateFormatter(new Date(date.getFullYear(), date.getMonth() + 1, 0))
      break
    case 'year':
      dates.from = dateFormatter(new Date(date.getFullYear(), 0, 1))
      dates.to = dateFormatter(new Date(date.getFullYear(), 11, 31))
      break
  }
}

const dateFormatter = (date) => {
  const year = date.toLocaleString('default', { year: 'numeric' })
  const month = date.toLocaleString('default', { month: '2-digit' })
  const day = date.toLocaleString('default', { day: '2-digit' })

  // => yyyy-mm-dd
  return `${ year }-${ month }-${ day }`
}
</script>

<template>
  <v-card>
    <v-card-title>Podsumowanie finansowe</v-card-title>
    <v-card-text>
      <p>
        Podsumowanie umożliwia szybką weryfikację finansów organizacji poprzez analizę przychodów oraz kosztów w okresie określonym poniżej.
      </p>

      <v-row class="mt-4 mb-1" no-gutters>
        <v-col md="6" sm="12" class="pr-1">
          <v-text-field
            type="date"
            label="Data początkowa"
            hide-details
            v-model="dates.from"
          />
        </v-col>
        <v-col md="6" sm="12" class="pl-1">
          <v-text-field
            type="date"
            label="Data końcowa"
            hide-details
            v-model="dates.to"
          />
        </v-col>
      </v-row>

      <v-chip-group class="mb-2">
        <v-chip size="small" @click="insertDate('day')">Dziś</v-chip>
        <v-chip size="small" @click="insertDate('month')">Ten miesiąc</v-chip>
        <v-chip size="small" @click="insertDate('year')">Bieżący rok</v-chip>
      </v-chip-group>

      <v-btn
        id="download-activator"
        color="primary"
        block
        append-icon="mdi-chevron-down"
        :disabled="(dates.from || dates.to).length === 0"
      >
        Pobierz w wybranym formacie
      </v-btn>

      <v-menu activator="#download-activator">
        <v-list elevation="1">
          <v-list-item link @click="downloadPDF">
            <v-list-item-title>Plik PDF</v-list-item-title>
          </v-list-item>
          <v-list-item link disabled>
            <v-list-item-title>Arkusz kalkulacyjny (.xlsx)</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-text>
  </v-card>
</template>
