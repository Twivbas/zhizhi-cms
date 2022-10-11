<template>
  <div>
    <p>Fixed header, sorted by header order</p>
    <DynamicTable :sortedByHeader="true"></DynamicTable><br/>
    <p>Fixed header, sorted by click order</p>
    <DynamicTable></DynamicTable>
  </div>
</template>

<script setup lang="ts">
import DynamicTable from './components/DynamicTable.vue'

</script>

<style scoped>

</style>
