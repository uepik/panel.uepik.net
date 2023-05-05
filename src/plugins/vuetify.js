// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@/assets/styles.scss'

// Polish translation
import { pl } from 'vuetify/locale'

// UEPiK theme
const customLightTheme = {
  dark: false,
  colors: {
    background: '#f7f7f7',
    grey: '#FF3D00',
    surface: '#FFFFFF',
    primary: '#4361ee',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default createVuetify({
  locale: {
    locale: 'pl',
    fallback: 'pl',
    messages: { pl }
  },
  theme: {
    defaultTheme: 'customLightTheme',
    themes: {
      customLightTheme,
    }
  },
  defaults: {
    global: {
      elevation: '0',
    }
  },
  styles: { configFile: 'src/assets/styles.scss' },
  components,
  directives
})