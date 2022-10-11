<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox  label="apple" size="large" />
      <el-checkbox  label="banana" size="large" />
      <el-checkbox  label="orange" size="large" />
    </el-checkbox-group>
    <el-table :data="tableData" border style="width: 100%" :key="key">
      <el-table-column prop="name" label="fruitName" width="180" />
      <el-table-column :prop="item" :label="item" v-for="item in checkList" :key="item" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'

const checkList = ref(['apple', 'banana'])
const key = ref(1)
const props = defineProps(['sortedByHeader'])

const tableData = [
  {
    name: 'fruit-1',
    apple: 'apple-10',
    banana: 'banana-10',
    orange: 'orange-10'
  },
  {
    name: 'fruit-2',
    apple: 'apple-20',
    banana: 'banana-20',
    orange: 'orange-20'
  }
]
// 每次点击表格都会抖动？
// 为了保证table 每次都会重渲
watch(checkList, () => {
  key.value++
  // sort by header
  if (props.sortedByHeader) {
    sortByHeader(checkList.value)
  }
})

// 默认情况下sort by click
const sortByHeader = (arr: string[]) => {
  const header = {
    apple: 1,
    banana: 2,
    orange: 3
  }
  arr.sort((a, b) => {
    return header[a as keyof typeof header] - header[b as keyof typeof header]
  })
}

</script>

<style scoped>

</style>
