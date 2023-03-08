<script setup>
const links = {
  privacyPolicy: 'https://uepik.net/polityka-prywatnosci',
  termsOfUse: 'https://uepik.net/regulamin'
}
</script>

<template>
  <p class="text-center mt-5 text-caption text-disabled">
    Rejestrując lub logując do serwisu, akceptujesz<br/>
    <a :href="links.privacyPolicy" target="_blank" class="text-decoration-none text-grey-darken-2">politykę prywatności</a> oraz <a :href="links.termsOfUse" class="text-decoration-none text-grey-darken-2">regulamin</a>.
  </p>
</template>