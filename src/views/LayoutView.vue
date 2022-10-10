<template>
  <div class="homepage_container">
    <div class="homepage_header">
      <div class="left">
        <img src="@/assets/logo.png" class="logo">
      </div>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item v-for="(item, index) in matchedRoute" :key="index" :to="(index < matchedRoute.length-1 ? { path: `/${(item as string).toLowerCase()}` } : {})">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="right">
        <el-button class="logOut" @click="delToken">退出登录</el-button>
      </div>
    </div>
    <div class="homepage_menu">
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" :router="true" :unique-opened="false">
        <template v-for="item in menus" :key="item.path">
          <el-sub-menu :index="item.path" v-if="item.meta && item.children">
            <template #title>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item :index="item.path +'/'+ c.path" v-for="c in item.children" :key="c.path">{{ c.meta?.title }}
            </el-menu-item>
          </el-sub-menu>
          <!-- children只有一项 -->
          <el-menu-item :index="item.path !== '/' ? item.path +'/'+ item.children[0].path: '/' + item.children[0].path" v-else-if="item.children && item.children.length === 1 && !item.children[0].meta?.hidden">
            <span>{{ item.children[0].meta?.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="homepage_content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const user = useUserStore()

const matchedRoute = computed(() => {
  const arr = route.matched.map(item => item.name)
  if (arr[0] === undefined) {
    arr.shift()
  }
  if (arr[0] !== 'Home') {
    arr.unshift('Home')
  }
  return arr
})

// 面包屑点击后菜单栏没有改变高亮，修改menu的defalutActive属性
let defaultActive = computed(() => {
  return route.path
})

// 获取所有路由
let menus = user.filteredRoutes
// console.log('menus', menus)

const delToken =  () => {
  user.logout()
  router.push({path: '/login'})
}

</script>

<style lang="scss" scoped>
.homepage_container {
  position: relative;
  height: 100%;

  .homepage_header {
    height: 68px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid#304156;

    .bread {
      margin: auto;
      margin-left: 100px;
      font-size: 16px;
    }

    .left {
      width: 100px;
      padding-left: 26px;

      .logo {
        height: 68px;
      }
    }

    .right {

      .logOut {
        --el-button-bg-color: #666;
        --el-button-text-color: #fff;
        margin: 24px;
        border: none;
      }
    }
  }

  .homepage_menu {
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 201px;
    background-color: #5f6770;
    // :deep .el-menu-vertical-demo :hover {
    //   background-color: #071f3d;
    // }
    :deep .el-menu-item:hover {
      background-color: #071f3d !important;
    }
    :deep .el-menu-vertical-demo .is-active {
      color: 	#409EFF;
    }
    :deep .el-menu-vertical-demo li {
      color: #f0f2f5;
      background-color: #304156;
    }
    :deep .el-menu-vertical-demo .el-sub-menu__title {
      color: #f0f2f5;
      background-color: #304156;
    }
  }

  .homepage_content {
    position: absolute;
    top: 70px;
    right: 0;
    left: 200px;
    bottom: 0;
    background-color: #f0f2f5;
    padding: 30px;
  }
}
</style>
