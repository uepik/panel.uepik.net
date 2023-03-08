<script setup>
import { ref, computed } from 'vue'
import router from '@/router'
import { useStore } from 'vuex'
import LoginActionAlert from '@/components/LoginActionAlert.vue'
import PrivacyPolicyDisclaimer from '@/components/PrivacyPolicyDisclaimer.vue'

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
    .catch(() => router.push({
      query: {
        action:'invalid-auth-credentials'
      }
    }))
}
</script>

<template>
  <v-container class="mt-10">
    <v-row no-gutters>
      <v-col sm="12" md="4" offset-md="4" justify="center">
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

            <!-- REDIRECT TO REGISTER -->
            <v-btn
              block
              class="mt-1"
              variant="plain"
              to="/register"
            >
              Nie masz konta? Zarejestruj się!
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- AuthDisclaimer -->
        <!-- <p class="text-center mt-5 text-caption text-disabled">
          Rejestrując lub logując do serwisu, akceptujesz<br/>
          <a href="https://uepik.net/polityka-prywatnosci#" target="_blank" class="text-decoration-none text-grey-darken-2">politykę prywatności</a> oraz <a href="https://uepik.net/regulamin#" class="text-decoration-none text-grey-darken-2">regulamin</a>.
        </p> -->
        <PrivacyPolicyDisclaimer />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
