<script setup >
import { ref } from 'vue'
import BugReportButton from '@/components/BugReportButton.vue'

const drawer = ref(true)

const appNavigation = [
  { icon: 'mdi-finance', title: 'Podsumowanie' },
  { icon: 'mdi-briefcase-plus', title: 'Przychody' },
  { icon: 'mdi-briefcase-minus', title: 'Koszty' },
  { icon: 'mdi-file-download-outline', title: 'Raporty' }
]

const userNavigation = [
  { icon: 'mdi-account', title: 'Moje konto' },
  { icon: 'mdi-cog', title: 'Ustawienia firmy' }
]
</script>

<template>
  <v-app id="inspire">
    <template v-if="$store.getters.isAuth">
      <!-- title -->
      <v-app-bar app color="white">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Panel UEPiK.net</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
      </v-app-bar>

      <!-- navigation -->
      <v-navigation-drawer
        permanent
        border="0"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://scontent-waw1-1.xx.fbcdn.net/v/t39.30808-6/328967012_1277859476125827_4065357418528766058_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=2D1nkxYXOjEAX_1W2aW&_nc_ht=scontent-waw1-1.xx&oh=00_AfB_wPQO9Aj9juOk7scu1g18pEfgy5avPT0fUNmKBoXYrQ&oe=6408648A"
            class="my-3"
          >
            <v-list-item-title class="userDetails__title">
              {{ $store.getters.user.firstLastName }}
            </v-list-item-title>
            <v-list-item-subtitle class="userDetails__organisation">
              {{ $store.getters.user.company.name }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <!-- App navigation items -->
        <v-list density="compact" nav>
          <v-list-item
            v-for="item in appNavigation"
            :key="item.id"
            :prepend-icon="item.icon"
            :title="item.title"
            value="home"
          ></v-list-item>
        </v-list>
        
        <v-divider></v-divider>
        
        <!-- User nav items -->
        <v-list density="compact" nav>
          <v-list-item
            v-for="item in userNavigation"
            :key="item.id"
            :prepend-icon="item.icon"
            :title="item.title"
            value="home"
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
