<template>
  <div>
    <div id="test" style="margin-bottom: 10px;">
      <p>Let user's focus on page by drivejs.</p>
    </div>
    <el-button @click="handleClick">Start</el-button>
  </div>
</template>

<script setup lang="ts">
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'


const driver = new Driver()
const steps = [
  {
    element: '.el-menu-item',
    popover: {
      title: 'Menu bar',
      description: 'Click the menu bar to jump the page',
      position: 'right'
    }
  },
  {
    element: '.el-breadcrumb',
    popover: {
      title: 'Breadcrumb',
      description: 'Your position',
      position: 'bottom'
    }
  },
  {
    element: '.right',
    popover: {
      title: 'Log out',
      description: 'Click it to log out',
      position: 'left'
    }
  }
]

// onMounted(() => {
//   driver.highlight('#test')
// })

const handleClick = () => {
  setTimeout(() => {
    driver.defineSteps(steps)
    driver.start()
  })
}

</script>

<style scoped>

</style>
