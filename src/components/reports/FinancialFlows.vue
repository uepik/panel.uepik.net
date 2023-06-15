<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { usePDF } from 'vue3-pdfmake'
import currencyFormat from '@/helpers/currencyFormat'
import sumByCategory from '@/helpers/sumByCategory'
import dateToISO from '@/helpers/dateToISO'

const store = useStore()
const pdf = usePDF()

const user = reactive({ ...store.getters.user })
const company = reactive({ ...store.getters.company })
const transactions = computed(() => store.getters.transactions)

const period = ref('Czerwiec 2023')

// Filter by dates
// const filterByDates = (transactions, from, to) => {
//   return transactions.filter(item => {
//     const transactionsDate = new Date(item.operationDate)
//     return (transactionsDate >= new Date(from) && transactionsDate <= new Date(to))
//   })
// }

// Sum by category
// const sumBySpecificCategory = (arr, category) => {
//   const filtered = arr.filter(item => item.category === category).reduce((acc, next) => acc + next.value, 0)
//   return currencyFormat(filtered || 0)
// }

// const count = (category) => {
//   const array = filterByDates(transactions.value, dates.from, dates.to)
//   return sumBySpecificCategory(array, category)
// }

// PDF
const downloadPDF = () => {
  pdf.createPdf({
    pageSize: 'A4',
    pageOrientation: 'landscape',
    content: [
      {
        text: 'Zestawienie przepływów finansowych',
        style: 'header'
      },
      {
        text: [
          company.name,
          `\n${ company.address.street }, ${ company.address.zipCode } ${ company.address.city }`,
          `\nNIP ${ company.nip }`
        ],
        style: 'subheader'
      },
      // Table
      {
        style: 'table',
        table: {
          widths: [80, 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          heights: ['auto', 20, 20, 'auto', 'auto', 'auto', 'auto'],
          // headerRows: 2,
          // keepWithHeaderRows: 1,
          body: [
            [
              { text: '', rowSpan: 2 },
              { text: 'Przychody', colSpan: 2, style: 'tableHeader' }, {},
              { text: 'Koszty uzyskania przychodów', colSpan: 2, style: 'tableHeader' }, {},
              { text: 'Dochód w rozumieniu art. 7 ustawy o podatku dochodowym od osób prawnych', colSpan: 2, style: 'tableHeader' }, {},
              { text: 'Dochód (przychód) wolny od podatku w roku podatkowym przeznaczony na cele określone w art. 17 ust. 1 ustawy o podatku dochodowym od osób prawnych', colSpan: 2, style: 'tableHeader' }, {},
              { text: 'Wydatki na cele określone w art. 17 ust. 1 ustawy o podatku dochodowym od osób prawnych pokryte z dochodu zwolnionego od podatku w roku podatkowym', colSpan: 2, style: 'tableHeader' }, {},
              { text: 'Dochód wolny od podatku z lat ubiegłych przeznaczony na cele określone w art. 17 ust. 1 ustawy o podatku dochodowym od osób prawnych', colSpan: 2, style: 'tableHeader' }, {},
              { text: 'Wydatki na cele w rozumieniu art. 17 ust. 1 ustawy o podatku dochodowym od osób prawnych pokryte z dochodu z lat ubiegłych zwolnionego od podatku', colSpan: 2, style: 'tableHeader' }, {},
              { text: 'Ogółem dochód wolny od podatku niewydatkowany na cele, o których mowa w art. 17 ust. 1 ustawy o podatku dochodowym od osób prawnych', colSpan: 2, style: 'tableHeader' }, {},
            ],
            [
              { text: '', style: 'tableHeader'},
              { text: 'zł', style: 'tableHeader'}, { text: 'gr', style: 'tableHeader'},
              { text: 'zł', style: 'tableHeader'}, { text: 'gr', style: 'tableHeader'},
              { text: 'zł', style: 'tableHeader'}, { text: 'gr', style: 'tableHeader'},
              { text: 'zł', style: 'tableHeader'}, { text: 'gr', style: 'tableHeader'},
              { text: 'zł', style: 'tableHeader'}, { text: 'gr', style: 'tableHeader'},
              { text: 'zł', style: 'tableHeader'}, { text: 'gr', style: 'tableHeader'},
              { text: 'zł', style: 'tableHeader'}, { text: 'gr', style: 'tableHeader'},
              { text: 'zł', style: 'tableHeader'}, { text: 'gr', style: 'tableHeader'},
            ],
            [
              { text: '1', style: 'tableHeader'},
              { text: '2', style: 'tableHeader', colSpan: 2 }, {},
              { text: '3', style: 'tableHeader', colSpan: 2 }, {},
              { text: '4', style: 'tableHeader', colSpan: 2 }, {},
              { text: '5', style: 'tableHeader', colSpan: 2 }, {},
              { text: '6', style: 'tableHeader', colSpan: 2 }, {},
              { text: '7', style: 'tableHeader', colSpan: 2 }, {},
              { text: '8', style: 'tableHeader', colSpan: 2 }, {},
              { text: '9', style: 'tableHeader', colSpan: 2 }, {},
            ],
            [
              { text: 'Razem w okresie sprawozdawczym, w tym w zakresie art. 17 ust. 1: \na) pkt 4\nb) pkt 40\nc) pkt 47\n ustawy o podatku dochodowym od osób prawnych', rowSpan: 2 },
              {}, {},
              {}, {},
              {}, {},
              {}, {},
              {}, {},
              {}, {},
              {}, {},
              {}, {},
            ],
            [
              {},
              { text: 'a) b) c)' }, { text: 'a) b) c)' },
              { text: 'a) b)' }, { text: 'a) b)' },
              {}, {},
              { text: 'a) b)' }, { text: 'a) b)' },
              { text: 'a) b)' }, { text: 'a) b)' },
              {}, {},
              { text: 'a) b)' }, { text: 'a) b)' },
              {}, {}
            ],
            [
              { text: 'Razem od początku roku podatkowego, w tym w zakresie art. 17 ust. 1: \na) pkt 4\nb) pkt 40\nc) pkt 47\n ustawy o podatku dochodowym od osób prawnych', rowSpan: 2 },
              {}, {},
              {}, {},
              {}, {},
              {}, {},
              {}, {},
              {}, {},
              {}, {},
              {}, {},
            ],
            [
              {},
              { text: 'a) b) c)' }, { text: 'a) b) c)' },
              { text: 'a) b)' }, { text: 'a) b)' },
              {}, {},
              { text: 'a) b)' }, { text: 'a) b)' },
              { text: 'a) b)' }, { text: 'a) b)' },
              {}, {},
              { text: 'a)' }, { text: 'a)' },
              {}, {}
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5
        }
      },
    ],
    styles: {
      header: {
        fontSize: 11,
        bold: true,
        alignment: 'center',
        // [left, top, right, bottom]
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 10,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      table: {
        fontSize: 7,
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        alignment: 'center'
      }
      // footer: {
      //   fontSize: 8,
      //   italics: true,
      //   margin: [0, 90, 0, 0]
      // }
    }
  }).open()
}

// const insertDate = (range) => {
//   const date = new Date()

//   switch (range) {
//     case 'day':
//       dates.from = dates.to = dateToISO(new Date())
//       break
//     case 'month':
//       dates.from = dateToISO(new Date(date.getFullYear(), date.getMonth(), 1))
//       dates.to = dateToISO(new Date(date.getFullYear(), date.getMonth() + 1, 0))
//       break
//     case 'year':
//       dates.from = dateToISO(new Date(date.getFullYear(), 0, 1))
//       dates.to = dateToISO(new Date(date.getFullYear(), 11, 31))
//       break
//   }
// }
</script>

<template>
  <v-card>
    <v-card-title>Zestawienie przepływów finansowych</v-card-title>
    <v-card-text>
      <p>
        Zestawienie przepływów finansowych przygotowane zgodnie ze wzorem z załącznika nr 2 do
        <a href="https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20180002050">rozporządzenia w sprawie prowadzenia UEPiK</a>.
        
      </p>

      <div class="mt-4 mb-1">
        <v-select
          clearable
          label="Okres sprawozdawczy"
          :items="['Kwiecień 2023', 'Maj 2023', 'Czerwiec 2023']"
          v-model="period"
          ></v-select>
      </div>

      <!-- <v-chip-group class="mb-2">
        <v-chip size="small" @click="insertDate('day')">Dziś</v-chip>
        <v-chip size="small" @click="insertDate('month')">Ten miesiąc</v-chip>
        <v-chip size="small" @click="insertDate('year')">Bieżący rok</v-chip>
      </v-chip-group> -->

      <v-btn
        id="zpf-activator"
        color="primary"
        block
        append-icon="mdi-chevron-down"
      >
        Pobierz w wybranym formacie
      </v-btn>

      <v-menu activator="#zpf-activator">
        <v-list elevation="1">
          <v-list-item link @click="downloadPDF">
            <v-list-item-title class="uepik-dropdown-item">Plik PDF</v-list-item-title>
          </v-list-item>
          <v-list-item link disabled>
            <v-list-item-title class="uepik-dropdown-item">Arkusz kalkulacyjny (.xlsx)</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-text>
  </v-card>
</template>
