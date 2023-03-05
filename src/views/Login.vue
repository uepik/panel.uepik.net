<script setup>
import { ref, reactive } from 'vue'

const credentialsForm = ref({
  email: '',
  password: ''
})

let isButtonLoading = ref(false)

const tryToLogIn = async () => {
  isButtonLoading.value = true

  // ...
}
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6" offset="3">
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
