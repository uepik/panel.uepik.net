<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const credentialsForm = ref({
  email: '',
  password: ''
})

let isButtonLoading = ref(false)

const tryToLogIn = async () => {
  isButtonLoading.value = true

  const query = await fetch('http://localhost:3030/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentialsForm.value),
  })

  const response = await query.json();
  
  if (response.status === 200) {
    isButtonLoading.value = false

    // temporary save user data to localstorage
    // will be replaced by Vuex in the future
    localStorage.setItem('user', JSON.stringify(response.user))
    router.push('/')
  } else {
    isButtonLoading.value = false
    console.log('user not found')
  }
}
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="4" offset="4">
        <v-card>
          <v-card-title class="text-center justify-center py-6 mb-4">
            <h1 class="text-h5">
              Logowanie
            </h1>
          </v-card-title>
          <v-card-text>
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
</template>

<style scoped>
</style>
