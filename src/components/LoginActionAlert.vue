<script setup>
const props = defineProps(['actionQueryValue'])

const actionsArr = [
  {
    query: 'auth-required',
    vAlertType: 'warning',
    message: 'Dostęp do tej strony wymaga uwierzytelnienia. Zaloguj się, aby przejść dalej.'
  },
  {
    query: 'logged-out-successfully',
    vAlertType: 'success',
    message: 'Wylogowano poprawnie.'
  },
  {
    query: 'invalid-auth-credentials',
    vAlertType: 'error',
    message: 'Podano błędny e-mail lub/i hasło.'
  }
]

const action = actionsArr.find((action) => {
  return action.query === props.actionQueryValue
})
</script>

<template>
  <v-alert
    :text="action.message"
    :type="action.vAlertType"
  ></v-alert>
</template>