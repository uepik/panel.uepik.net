<script setup>
import { ref, reactive } from 'vue'
import PrivacyPolicyDisclaimer from '@/components/PrivacyPolicyDisclaimer.vue'

let tab = ref('Twoje dane')
const viewTabItems = ['Twoje dane', 'Dane organizacji']

const form = reactive({
  firstLastName: '',
  email: '',
  password: '',
  company: {
    nip: '',
    name: '',
    address: {
      street: '',
      zipCode: '',
      city: ''
    }
  }
})

let isRegisterButtonLoading = ref(false)
let isAccountCreated = ref(false)
let isOrganisationFetching = ref(false)

const register = async () => {
  isRegisterButtonLoading.value = true

  if (!isAccountCreated.value) { // allow 1 register in session, needs improve on backend
    const createUserQuery = await fetch('http://localhost:3030/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        createdAt: Date.now()
      }),
    })
    
    if (await createUserQuery.text()) {
      isRegisterButtonLoading.value = false
      isAccountCreated.value = true
    }
  }
}
const fetchContractorByNIP = async () => {
  isOrganisationFetching.value = true

  const query = await fetch(`http://localhost:3030/companyByNIP/${form.company.nip}`)
  const response = await query.json()

  if (response) {
    const { nip, name, address, zipCode, location } = response
    form.company = {
      nip,
      name,
      address: {
        street: address,
        zipCode,
        city: location
      }
    }

    isOrganisationFetching.value = false
  }
}
</script>

<template>
  <v-container class="mt-10">
    <v-row no-gutters>
      <v-col sm="12" md="4" offset-md="4" justify="center">
        <img src="/uepik_logo.svg" alt="" width="140" class="mb-6 mx-auto d-block">

        <v-card color="basil" md="5">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="text-h5">
              Rejestracja
            </h1>
          </v-card-title>

          <v-alert
            text="Konto zostało utworzone, przejdź do logowania."
            type="success"
            v-if="isAccountCreated"
          ></v-alert>

          <v-tabs
            v-model="tab"
            bg-color="transparent"
            color="primary"
            grow
          >
            <v-tab
              v-for="item in viewTabItems"
              :key="item"
              :value="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item
              v-for="item in viewTabItems"
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
                    v-model="form.firstLastName"
                    label="Imię i nazwisko"
                  ></v-text-field>

                  <!-- E-mail -->
                  <v-text-field
                    v-model="form.email"
                    label="Adres e-mail"
                  ></v-text-field>

                  <!-- Password -->
                  <v-text-field
                    v-model="form.password"
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

                  <!-- REDIRECT TO LOGIN -->
                  <v-btn
                    block
                    class="mt-1"
                    variant="plain"
                    to="/logowanie"
                  >
                    Masz juz konto? Zaloguj się!
                  </v-btn>
                </v-card-text>
                <v-card-text v-else>
                  <!-- Company info -->
                  <!-- NIP -->
                  <v-text-field
                    v-model="form.company.nip"
                    label="Numer identyfikacji podatkowej"
                    placeholder="7311795229"
                    :disabled="isOrganisationFetching"
                    required
                    hide-details
                    class="mb-1"
                  ></v-text-field>

                  <v-btn 
                    @click="fetchContractorByNIP"
                    :loading="isOrganisationFetching"
                    block
                    class="mb-8 mt-1"
                    append-icon="mdi-cloud-arrow-down-outline"
                    variant="text">Uzupełnij automatycznie po NIP-ie</v-btn>

                  <!-- NGO name -->
                  <v-text-field
                    v-model="form.company.name"
                    :loading="isOrganisationFetching"
                    :disabled="isOrganisationFetching"
                    label="Nazwa organizacji"
                    placeholder="Fundacja Rozwoju Cyfryzacji"
                    required
                  ></v-text-field>

                  <!-- Company address -->
                  <v-text-field
                    v-model="form.company.address.street"
                    :loading="isOrganisationFetching"
                    :disabled="isOrganisationFetching"
                    label="Adres"
                    placeholder="ul. Piotrkowska 46/6u"
                    required
                  ></v-text-field>

                  <!-- Company postal code -->
                  <v-text-field
                    v-model="form.company.address.zipCode"
                    :loading="isOrganisationFetching"
                    :disabled="isOrganisationFetching"
                    label="Kod pocztowy"
                    placeholder="90-265"
                    required
                  ></v-text-field>

                  <!-- Company city -->
                  <v-text-field
                    v-model="form.company.address.city"
                    :loading="isOrganisationFetching"
                    :disabled="isOrganisationFetching"
                    label="Miejscowość"
                    placeholder="Łódź"
                    required
                  ></v-text-field>

                  <!-- SEND -->
                  <v-btn
                    block
                    color="primary"
                    :loading="isRegisterButtonLoading"
                    :disabled="isAccountCreated || isOrganisationFetching"
                    @click="register()"
                  >
                    Zarejestruj się
                  </v-btn>

                  <!-- REDIRECT TO LOGIN -->
                  <v-btn
                    block
                    class="mt-1"
                    variant="plain"
                    to="/logowanie"
                  >
                    Masz juz konto? Zaloguj się!
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>

        <PrivacyPolicyDisclaimer />
      </v-col>
    </v-row>
  </v-container>
</template>
