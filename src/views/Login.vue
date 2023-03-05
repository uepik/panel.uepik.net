<script setup>
import { ref, reactive } from 'vue'

let tab = ref('Twoje dane')
const items = ['Twoje dane', 'Dane firmy']

const userForm = ref({
  firstLastName: '',
  email: '',
  password: ''
})

const companyForm = ref({
  nip: '',
  name: '',
  address: {
    street: '',
    zipCode: '',
    city: ''
  }
})

let isRegisterButtonLoading = ref(false)

const register = async () => {
  isRegisterButtonLoading = true

  const createUserResponse = await fetch('http://localhost:3030/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userForm.value),
  })

  const createCompanyResponse = await fetch('http://localhost:3030/companies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(companyForm.value),
  })

  const userRes = await createUserResponse.text();
  const companyRes = await createCompanyResponse.text();
  isRegisterButtonLoading = false

  console.log(userRes, companyRes);
}
</script>

<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="6" offset="3">
        <v-card color="basil" md="5">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h2 text-basil">
              BASiL
            </h1>
          </v-card-title>

          <v-tabs
            v-model="tab"
            bg-color="transparent"
            color="primary"
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item"
              :value="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item
              v-for="item in items"
              :key="item"
              :value="item"
            >
              <v-card
                color="basil"
                flat
              >
                <v-card-text v-if="tab == 'Twoje dane'">
                  <!-- First & last name -->
                  <v-text-field
                    v-model="userForm.firstLastName"
                    label="Imię i nazwisko"
                  ></v-text-field>

                  <!-- E-mail -->
                  <v-text-field
                    v-model="userForm.email"
                    label="Adres e-mail"
                  ></v-text-field>

                  <!-- Password -->
                  <v-text-field
                    v-model="userForm.password"
                    label="Hasło"
                    type="password"
                  ></v-text-field>

                  <!-- SEND -->
                  <v-btn
                    block
                    variant="tonal"
                    @click="tab = 'Dane firmy'"
                  >
                    Przejdź dalej
                  </v-btn>
                </v-card-text>
                <v-card-text v-else>
                  <!-- Company info -->
                  <!-- NIP -->
                  <v-text-field
                    v-model="companyForm.nip"
                    label="Numer identyfikacji podatkowej (NIP)"
                    placeholder="7311795229"
                    required
                  ></v-text-field>

                  <!-- Company name -->
                  <v-text-field
                    v-model="companyForm.name"
                    label="Nazwa firmy"
                    placeholder="Fundacja John Doe"
                    required
                  ></v-text-field>

                  <!-- Company address -->
                  <v-text-field
                    v-model="companyForm.address.street"
                    label="Adres"
                    placeholder="al. Jerozolimskie 98"
                    required
                  ></v-text-field>

                  <!-- Company postal code -->
                  <v-text-field
                    v-model="companyForm.address.zipCode"
                    label="Kod pocztowy"
                    placeholder="00-321"
                    required
                  ></v-text-field>

                  <!-- Company city -->
                  <v-text-field
                    v-model="companyForm.address.city"
                    label="Miejscowość"
                    placeholder="Warszawa"
                    required
                  ></v-text-field>

                  <!-- SEND -->
                  <v-btn
                    block
                    color="primary"
                    :loading="isRegisterButtonLoading"
                    @click="register()"
                  >
                    Zarejestruj się
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
