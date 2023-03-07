<script setup>
import { ref, reactive, computed } from 'vue'
// import { useRouter } from 'vue-router'
import router from '../router'
import { useStore } from 'vuex'
import LoginActionAlert from '../components/LoginActionAlert.vue'

// const router = useRouter()
const store = useStore()

const credentialsForm = ref({
  email: '',
  password: ''
})

let user = {}

computed(() => {
  user = store.getters.user
})

let isButtonLoading = ref(false)

const tryToLogIn = () => {
  store.dispatch('login', credentialsForm.value)
    .then(() => router.push('/'))
}
</script>

<template>
  <v-main class="mt-10">
    <v-container>
      <v-row no-gutters>
        <v-col cols="4" offset="4">
          <v-card>
            <v-card-title class="text-center justify-center py-6">
              <h1 class="text-h5">
                Logowanie
              </h1>
            </v-card-title>

            <LoginActionAlert
              v-if="$route.query.action"  
              :actionQueryValue="$route.query.action" />

            <v-card-text class="mt-3">
              <!-- E-mail -->
              <v-text-field
                v-model="credentialsForm.email"
                label="Adres e-mail"
                :autofocus="true"
                hide-details
              ></v-text-field>

              <!-- Password -->
              <v-text-field
                v-model="credentialsForm.password"
                label="Hasło"
                type="password"
                class="mt-2"
              ></v-text-field>

              <!-- SEND -->
              <v-btn
                block
                color="primary"
                :loading="isButtonLoading"
                @click="tryToLogIn()"
              >
                Zaloguj się
              </v-btn>
            </v-card-text>
          </v-card>
          <p class="text-center mt-3 text-caption">Nie masz konta? <router-link to="/register" class="text-decoration-none text-primary">Zarejestruj się</router-link>.</p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
</style>
