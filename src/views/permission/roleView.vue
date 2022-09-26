<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">New Role</el-button>

    <el-table :data="rolesList" style="width: 100%; margin-top: 30px" border>
      <el-table-column align="center" label="Role Key" width="220">
        <template #default="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Description">
        <template #default="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="dialogType === 'edit' ? 'Edit Role' : 'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input v-model="role.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
            placeholder="Role Description" />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree ref="treeRef" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox
            node-key="path" class="permission-tree" />
        </el-form-item>
      </el-form>
      <div style="text-align: right">
        <el-button type="danger" @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="confirmRole">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

import { reactive, ref, computed, nextTick, getCurrentInstance, toRefs } from 'vue'
import { getRoutesApi, getRolesApi, addRoleApi, deleteRoleApi, updateRoleApi, } from '@/request/api'
import { RouteRecordRaw } from 'vue-router'
import { IRole, ITreeData } from '@/type/type'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import _ from 'lodash'

let rolesList = ref<IRole[]>([])
let routes = ref<ITreeData[]>([])

let dialogVisible = ref(false)
let dialogType = ref('new')
let checkStrictly = ref(false)
const defaultProps = {
  children: 'children',
  label: 'title',
}
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: [],
}
let data = reactive<{
  role: IRole
}>({
  role: {
    key: '',
    name: '',
    description: '',
    routes: [],
  }
})
let { role } = toRefs(data)

let routesData = computed(() => {
  // 过滤掉onlyOneShowingChildFuc修改的空路由
  return routes.value.filter(route => route.path)
})
let serviceRoutes = ref<RouteRecordRaw[]>([])

const geteRoles = async () => {
  const res = await getRolesApi()
  rolesList.value = res.data
}
const getRoutes = async () => {
  const res = await getRoutesApi()
  serviceRoutes.value = res.data
  routes.value = generateRoutes(res.data)
}


const onlyOneShowingChildFuc = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw) => {
  let onlyOneChild = null
  const showingChildren = children.filter(item => item.meta && !item.meta.hidden)
  // const showingChildren = children

  // When there is only one child route, the child route is displayed by default
  if (showingChildren.length === 1) {
    onlyOneChild = showingChildren[0]
    // not use path module
    // 只对children路由加工一次path
    if (onlyOneChild.path[0] !== '/') {
      if (parent.path !== '/') {
        onlyOneChild.path = parent.path + '/' + onlyOneChild.path
      } else {
        onlyOneChild.path = '/' + onlyOneChild.path
      }
    }
    return onlyOneChild
  }

  // Show parent if there are no child route to display
  if (showingChildren.length === 0) {
    onlyOneChild = { ...parent, path: '' }
    return onlyOneChild
  }

  return false
}
// 加工routes
const generateRoutes = (routes: RouteRecordRaw[]) => {
  const res: ITreeData[] = []
  for (let route of routes) {
    if (route.meta && route.meta.hidden) {
      continue
    }

    const onlyOneShowingChild = onlyOneShowingChildFuc(route.children, route)

    if (route.children && onlyOneShowingChild) {
      route = onlyOneShowingChild
    }

    const data: ITreeData = {
      // path: basePath + route.path,
      path: route.path,
      title: route.meta && (route.meta.title as string),
    }

    // recursive child routes
    if (route.children) {
      data.children = generateRoutes(route.children)
    }
    res.push(data)
  }
  return res
}
const generateArr = (routesProduct: ITreeData[]) => {
  let data: ITreeData[] = []
  routesProduct.forEach((route) => {
    data.push(route)
    if (route.children) {
      const temp = generateArr(route.children)
      if (temp.length > 0) {
        data = [...data, ...temp]
      }
    }
  })
  return data
}

// 获取el-tree节点proxy.$refs.treeRef
const { proxy } = getCurrentInstance()

const handleEdit = async (row: IRole) => {
  dialogType.value = 'edit'
  dialogVisible.value = true
  checkStrictly.value = true
  role.value = _.cloneDeep(row)
  nextTick(() => {
    const roleRoutes = generateRoutes(role.value.routes)
    // console.log(proxy.$refs.treeRef.setCheckedNodes)
    proxy.$refs.treeRef.setCheckedNodes(generateArr(roleRoutes))
    checkStrictly.value = false
  })
}

const handleDelete = async (index: number, row: IRole) => {
  ElMessageBox.confirm('Confirm to remove the role?', 'Warning', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(async () => {
    await deleteRoleApi(row.key)
    rolesList.value.splice(index, 1)
    ElMessage({
      type: 'success',
      message: 'Delete succed!'
    })
  })
    .catch(err => { console.error(err) })
}

const generateTree = (routes: RouteRecordRaw[], basePath = '/', checkedKeys: string[]) => {
  const res = []
  for (const route of routes) {
    const routePath = route.path

    if (route.children) {
      route.children = generateTree(route.children, routePath, checkedKeys)
    }

    if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
      res.push(route)
    }
  }
  return res
}
const confirmRole = async () => {
  const isEdit: boolean = dialogType.value === 'edit'
  const checkedKeys: string[] = proxy.$refs.treeRef.getCheckedKeys()
  role.value.routes = generateTree(_.cloneDeep(serviceRoutes.value), '/', checkedKeys)
  if (isEdit) {
    await updateRoleApi(role.value.key, role.value)
    for (let index = 0; index < rolesList.value.length; index++) {
      if (rolesList.value[index].key === role.value.key) {
        rolesList.value.splice(index, 1, Object.assign({}, role.value))
        break
      }
    }
  } else {
    const { data } = await addRoleApi(role.value)
    role.value.key = data.key
    rolesList.value.push(role.value)
  }

  const { description, key, name } = role.value
  dialogVisible.value = false
  ElNotification({
    title: 'Success',
    dangerouslyUseHTMLString: true,
    message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
    type: 'success'
  })
}

const handleAddRole = () => {
  role.value = Object.assign({}, defaultRole)
  if (proxy.$refs.treeRef) {
    proxy.$refs.treeRef.setCheckedNodes([])
  }
  dialogType.value = 'new'
  dialogVisible.value = true
}

getRoutes()
geteRoles()
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;

    :deep .is-leaf {
      color: white;
    }

    :deep .el-tree-node__label {
      margin-left: 6px;
    }
  }

}
</style>
