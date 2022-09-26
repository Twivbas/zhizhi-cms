<template>
  <div>
    Hi, {{ user.name }} 
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const user = useUserStore()
</script>

<style scoped>

</style>