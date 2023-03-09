<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import DashboardOverlay from '@/components/DashboardOverlay.vue'

const store = useStore()

const userForm = reactive({ ...store.getters.user })
const companyForm = reactive({ ...store.getters.company })

const userHandleSaveClick = () => {
  console.log('user po zmianach:', userForm)
}

const companyHandleSaveClick = () => {
  console.log('firma po zmianach:', companyForm)
}
</script>

<template>
  <DashboardOverlay>
    <v-row>
      <v-col md="6" sm="12">
        <v-card>
          <v-card-title>Ustawienia konta</v-card-title>
          <v-card-text>
            <!-- Name -->
            <v-text-field
              label="Imię i nazwisko"
              v-model="userForm.firstLastName"
            />
            <!-- Email -->
            <v-text-field
              label="Adres e-mail"
              v-model="userForm.email"
            />
            <!-- Photo URL -->
            <v-text-field
              label="Adres URL zdjęcia"
              v-model="userForm.photo"
            />
            <!-- Mailing -->
            <v-checkbox
              :model-value="true"
              label="Wyrażam zgodę na otrzymywanie drogą elektroniczną, na podany powyżej adres e-mail, informacji handlowych wysyłanych przez UEPiK.net z siedzibą w Łodzi, w imieniu własnym oraz na zlecenie innych osób."
            ></v-checkbox>

            <v-btn
              block
              @click="userHandleSaveClick"
            >Zapisz zmiany</v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="6" sm="12">
        <v-card>
          <v-card-title>Ustawienia firmy</v-card-title>
          <v-card-text>
            <!-- Company name -->
            <v-text-field
              label="Nazwa"
              v-model="companyForm.name"
            />
            <!-- NIP -->
            <v-text-field
              label="NIP firmy"
              v-model="companyForm.nip"
            />
            <!-- Address street -->
            <v-text-field
              label="Ulica i nr lokalu"
              v-model="companyForm.address.street"
            />
            <v-row>
              <v-col md="6" sm="12">
                <!-- Zip Code -->
                <v-text-field
                  label="Kod pocztowy"
                  v-model="companyForm.address.zipCode"
                />
              </v-col>
              <v-col md="6" sm="12">
                <!-- City -->
                <v-text-field
                  label="Miejscowość"
                  v-model="companyForm.address.city"
                />
              </v-col>
            </v-row>

            <v-btn
              block
              @click="companyHandleSaveClick"
            >Zapisz zmiany</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </DashboardOverlay>
</template>
