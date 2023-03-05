<script setup>
const openMailApp = () => {
  const settings = {
    to: 'pomoc@uepik.net',
    subject: `Zgłoszenie #${Date.now()}`,
    content: `proszę jak najdokładniej opisać błąd, w razie potrzeby dołączyć zrzut ekranu`
  }

  window.location.href = `
  mailto:${settings.to}
  ?subject=${settings.subject}
  &body=${settings.content.replace(/\n/g, '%0A')}`
}
</script>

<template>
  <v-btn
    block
    prepend-icon="mdi-chat-alert"
    color="primary"
    @click="openMailApp"
  >
    Zgłoś błąd
  </v-btn>
</template>