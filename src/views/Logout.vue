<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const logout = () => {
  store.dispatch('logout')
    .then(() => router.push({
      name: 'Login',
      query: {
        action: 'logged-out-successfully'
      }
    }))
}

logout()
</script>
