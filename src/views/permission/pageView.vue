<template>
  <SwitchRoles @change='handleRolesChange'/>
</template>

<script setup lang="ts">
import SwitchRoles from './components/SwitchRoles.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleRolesChange = () => {
  router.push({ path: '/permission/index?' + +new Date() })
}
</script>

<style scoped>

</style>
