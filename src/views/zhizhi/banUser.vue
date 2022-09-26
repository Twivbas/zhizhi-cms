<template>
  <el-table :data="tableData" border style="width: 90%;margin: 0 auto;" highlight-current-row>
    <el-table-column type="index" width="60" />
    <el-table-column label="用户名" width="100">
      <template #default="scope">
        <div>{{ scope.row.nickName }}</div>
      </template>
    </el-table-column>
    <el-table-column label="用户ID" width="160">
      <template #default="scope">
        <div>{{ scope.row.user_id }}</div>
      </template>
    </el-table-column>
    <el-table-column label="是否有权限点赞" width="140">
      <template #default="scope">
        <div>{{ scope.row.isAbleLike ? '是' : '否' }}</div>
      </template>
    </el-table-column>
    <el-table-column label="是否有权限答题" width="140">
      <template #default="scope">
        <div>{{ scope.row.isAbleAnswer ? '是' : '否' }}</div>
      </template>
    </el-table-column>
    <!-- <el-table-column label="所有回答" width="240">
      <template #default="scope">
        <div>{{ scope.row.createAnswers }}</div>
      </template>
    </el-table-column> -->
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row, scope.$index)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="编辑用户权限">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.value.nickName" disabled />
      </el-form-item>
      <el-form-item label="是否有权限点赞">
        <el-radio-group v-model="form.value.isAbleLike">
          <el-radio :label="true" >是</el-radio>
          <el-radio :label="false" >否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有权限答题">
        <el-radio-group v-model="form.value.isAbleAnswer">
          <el-radio :label="true" >是</el-radio>
          <el-radio :label="false" >否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue'
import { getUsers, banUser } from '@/request/api'

const state = reactive({
  tableData: []
})
let { tableData } = toRefs(state)

let dialogFormVisible = ref(false)
const formLabelWidth = '140px'

let form = reactive({})

getUsers().then(res => {
  tableData.value = res.data
}).catch(err => {
  console.log(err)
})

const handleEdit = (row, index: number) => {
  dialogFormVisible.value = true
  form.value = tableData.value[index]
  // 此处数据form改变了，但视图上还是没有变化
}

const handleConfirm = () => {
  dialogFormVisible.value = false
  // 数据已修改，需要一个接口修改数据库数据
  banUser(form.value).then((res) => {
    console.log('banUser', res)
  }).catch(err => {
    console.log('err', err)
  })
}
</script>

<style scoped>
</style>