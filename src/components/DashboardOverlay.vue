<script setup >
import { ref, reactive } from 'vue'
import BugReportButton from '@/components/BugReportButton.vue'
import { useStore } from 'vuex'

const store = useStore()

const navigation = [
  {
    name: 'Aplikacja',
    items: [
      { icon: 'mdi-plus-minus-variant', title: 'Finanse', routing: '/' },
      { icon: 'mdi-clipboard-account', title: 'Zatrudnienie', routing: '/employment' },
      { icon: 'mdi-folder-text', title: 'Środki trwałe', routing: '/fixedAssets' },
      { icon: 'mdi-download-box', title: 'Raporty', routing: '/reports' }
    ]
  },
  {
    name: 'Konto',
    items: [
      { icon: 'mdi-cog', title: 'Ustawienia', routing: '/settings' },
      { icon: 'mdi-logout', title: 'Wyloguj się', routing: '/logout' }
    ]
  }
]

const user = reactive({
  ...store.getters.user,
  isAuth: store.getters.isAuth
})
const company = reactive({ ...store.getters.company })
</script>

<template>
  <v-app id="inspire">
    <template v-if="user.isAuth">
      <!-- navigation -->
      <v-navigation-drawer
        app
        permanent
        disable-resize-watcher
        border="0"
        fixed
      >
        <template v-slot:prepend>
          <v-list-item-media class="py-5 text-center">
            <img src="/uepik_logo.svg" height="30">
          </v-list-item-media>

          <v-divider />

          <v-list-item
            lines="two"
            :prepend-avatar="user.photo"
            class="my-3"
          >
            <v-list-item-title class="userDetails__title">
              {{ user.firstLastName }}
            </v-list-item-title>
            <v-list-item-subtitle class="userDetails__organisation">
              {{ company.name }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>

        <v-divider />

        <!-- App navigation items -->
        <v-list density="compact" nav v-for="navCategory in navigation" :key="navCategory.name">
          <v-list-subheader class="font-weight-500">{{ navCategory.name }}</v-list-subheader>
          <v-list-item
            v-for="item in navCategory.items"
            :key="item.id"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.routing"
            active-color="primary"
          ></v-list-item>
        </v-list>

        <!-- Bottom buttons -->
        <template v-slot:append>
          <div class="pa-2">
            <BugReportButton />

            <v-btn block class="mt-1" variant="tonal" to="/logout">
              Wyloguj się
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </template>

    <!-- Space for content -->
    <v-main class="ma-5">
      <slot></slot>
    </v-main>
  </v-app>
</template>