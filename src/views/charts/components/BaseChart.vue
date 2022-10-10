<template>
  <div class="container">
    <div id="chart" class="chart" style="height:100%;width:100%;"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { debounce } from 'lodash'
import { ref, onMounted, onUnmounted, defineProps } from 'vue'

let chart: echarts.ECharts | null
const props = defineProps(['initChart'])

onMounted(() => {
  props.initChart(chart)
})

onUnmounted(() => {
  if (!chart) return
  chart.dispose()
  chart = null
})

const resize = () => {
  const sidebarElm = ref()
  const resizeHandler = ref()

  const sidebarResizeHandler = (e: {
    propertyName?: string
  }) => {
    if (e.propertyName === 'width') {
      resizeHandler.value()
    }
  }
  const resize = () => {
    // console.log('resize')
    chart && chart.resize()
  }
  const initListener = () => {
    resizeHandler.value = debounce(resize, 100)
    window.addEventListener('resize', resizeHandler.value)
    sidebarElm.value = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.value && sidebarElm.value.addEventListener('transitionend', sidebarResizeHandler)
  }
  onMounted(() => {
    initListener()
  })
}

resize()
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 70px);
  margin: -30px;
}
</style>
  
