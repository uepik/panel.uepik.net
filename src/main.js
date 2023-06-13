import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import { PDFPlugin } from 'vue3-pdfmake'

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .use(PDFPlugin)
  .mount('#app')
