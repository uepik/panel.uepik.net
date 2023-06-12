<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import DashboardOverlay from '@/components/DashboardOverlay.vue'

const router = useRouter()
const store = useStore()

const userForm = reactive({ ...store.getters.user })
const companyForm = reactive({ ...store.getters.company })
const isProfileButtonLoading = ref(false)
const isOrganisationButtonLoading = ref(false)
const isErrorVisible = ref(false)
const uid = store.getters.user._id

const logoutWithAlert = () => {
  store.dispatch('logout')
    .then(() => router.push({
      name: 'Login',
      query: {
        action: 'settings-was-changed'
      }
    }))
}

const userHandleSaveClick = async () => {
  // Clone object without _id due to behavior of updateOne mongodb function
  const userFormCopyWithoutID = { ...userForm }
  delete userFormCopyWithoutID._id

  isProfileButtonLoading.value = true
  isErrorVisible.value = false

    const query = await fetch(`http://localhost:3030/settings/${uid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userFormCopyWithoutID)
    })

    if (query.status === 200) {
      isProfileButtonLoading.value = false
      logoutWithAlert()
    } else {
      isErrorVisible.value = true
      isProfileButtonLoading.value = false
    }
}

const organisationHandleSaveClick = async () => {
  isOrganisationButtonLoading.value = true
  isErrorVisible.value = false

    const query = await fetch(`http://localhost:3030/settings/${uid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company: companyForm })
    })

    if (query.status === 200) {
      isOrganisationButtonLoading.value = false
      logoutWithAlert()
    } else {
      isErrorVisible.value = true
      isOrganisationButtonLoading.value = false
    }
}

const rodoLabel = `Wyrażam zgodę na przetwarzanie przez Fundację Rozwoju Cyfryzacji z siedzibą w
Łodzi (ul. Wólczańska 125, 90-521 Łódź) moich danych osobowych w postaci adresu
poczty elektronicznej w celu przesyłania mi informacji marketingowych
dotyczących produktów i usług oferowanych przez Fundację Rozwoju Cyfryzacji z
siedzibą w Łodzi (ul. Wólczańska 125, 90-521 Łódź) za pomocą środków
komunikacji elektronicznej, stosownie do treści przepisu art. 10 ust.
1 i 2 ustawy o świadczeniu usług drogą elektroniczną.`

const netlify = {
  context: import.meta.env.CONTEXT || 'dev',
  build: import.meta.env.BUILD_ID || 'dev',
  deploy: import.meta.env.DEPLOY_ID || 'dev'
}
</script>

<template>
  <DashboardOverlay>
    <v-row>
      <v-col>
        <h2 class="text-h4 view-title">Zarządzaj ustawieniami</h2>
      </v-col>
    </v-row>

    <v-alert
      v-if="isErrorVisible"
      type="error"
      class="my-4"
    >
      Przepraszamy, wystąpił błąd przy zmianie ustawień.
      Skontaktuj się z nami: <a href="mailto:uepik@frc.org.pl" class="text-white">uepik@frc.org.pl</a>.
    </v-alert>

    <v-row>
      <v-col md="6" sm="12">
        <v-card>
          <v-card-title>Ustawienia konta</v-card-title>
          <v-card-text>
            <!-- Name -->
            <v-text-field
              label="Imię i nazwisko"
              :disabled="isProfileButtonLoading"
              v-model="userForm.firstLastName"
            />
            <!-- Email -->
            <v-text-field
              label="Adres e-mail"
              :disabled="isProfileButtonLoading"
              v-model="userForm.email"
            />
            <!-- Photo URL -->
            <v-text-field
              label="Adres URL zdjęcia"
              :disabled="isProfileButtonLoading"
              v-model="userForm.photo"
            />
            <!-- Mailing -->
            <v-checkbox
              :model-value="true"
              :disabled="isProfileButtonLoading"
              :label="rodoLabel"
            ></v-checkbox>

            <v-btn
              block
              @click="userHandleSaveClick"
              :loading="isProfileButtonLoading"
              color="primary"
            >Zapisz zmiany</v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="6" sm="12">
        <v-card>
          <v-card-title>Ustawienia organizacji</v-card-title>
          <v-card-text>
            <!-- Company name -->
            <v-text-field
              label="Pełna nazwa"
              v-model="companyForm.name"
              :disabled="isOrganisationButtonLoading"
            />
            <!-- NIP -->
            <v-text-field
              label="Numer identyfikacji podatkowej"
              v-model="companyForm.nip"
              :disabled="isOrganisationButtonLoading"
            />
            <!-- Address street -->
            <v-text-field
              label="Ulica i nr lokalu"
              v-model="companyForm.address.street"
              :disabled="isOrganisationButtonLoading"
            />
            <v-row>
              <v-col md="6" sm="12">
                <!-- Zip Code -->
                <v-text-field
                  label="Kod pocztowy"
                  v-model="companyForm.address.zipCode"
                  :disabled="isOrganisationButtonLoading"
                />
              </v-col>
              <v-col md="6" sm="12">
                <!-- City -->
                <v-text-field
                  label="Miejscowość"
                  v-model="companyForm.address.city"
                  :disabled="isOrganisationButtonLoading"
                />
              </v-col>
            </v-row>

            <v-btn
              block
              @click="organisationHandleSaveClick"
              color="primary"
            >Zapisz zmiany</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <p class="mt-4 text-disabled text-caption text-center">{{ netlify.context }}_{{ netlify.build }} ({{ netlify.deploy }})</p>
  </DashboardOverlay>
</template>
