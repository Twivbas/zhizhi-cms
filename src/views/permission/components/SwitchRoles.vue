<template>
  <div style="margin-bottom:15px;">
    Your roles: {{ user.roles }}
  </div>
  Switch roles:
  <el-radio-group v-model="switchRoles">
    <el-radio-button label="editor" />
    <el-radio-button label="admin" />
  </el-radio-group>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, defineEmits } from 'vue'

const user = useUserStore()
const emit = defineEmits(['change'])

const switchRoles = computed({
  get() {
    return user.roles[0]
  },
  set(val: string) {
    user.changeRoles(val).then(() => {
      emit('change')
    })

  }
})
</script>

<style scoped>

</style>
