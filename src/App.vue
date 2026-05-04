<template>
  <router-view />
</template>

<script setup>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
$q.dark.set(true)

// export default defineComponent({
//   name: 'App'
//   const setup() {

//   }
// })
</script>
