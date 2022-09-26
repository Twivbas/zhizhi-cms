<template>
  <el-table ref="table" :data="tableData" border style="width: 90%;margin: 0 auto;" highlight-current-row>
    <el-table-column type="index" width="60" />
    <el-table-column label="热榜" width="360">
      <template #default="scope">
        <div>{{ scope.row.question[0].title }}</div>
      </template>
    </el-table-column>
    <el-table-column label="新增回答" width="180">
      <template #default="scope">
        <div>{{ scope.row.newAnswerCount }}</div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button size="small" type="danger" @click="handleDelete(scope.$index)">Delete</el-button>
      </template>
    </el-table-column>
    <el-table-column align="center" label="Drag" width="80">
      <template #default>
        <el-icon :size="20">
          <Rank />
        </el-icon>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs, nextTick } from 'vue'
import { getHotList, editHotList } from '@/request/api'
import Sortable from 'sortablejs'

interface ItableData {
  newAnswerCount: number
  question: []
  _id: string
}

let state = reactive<ItableData[]>({
  tableData: []
})
const { tableData } = toRefs(state)

getHotList().then(res => {
  tableData.value = res.data
}).catch(err => {
  console.log('err', err)
})

const handleEditHotList = () => {
  // 构造接口需要的参数
  const data = tableData.value.map(element => {
    const param = {}
    param._id = element._id
    param.newAnswerCount = element.newAnswerCount
    return param
  })
  editHotList(data).then(res => {
    console.log(res)
  }).catch(err => {
    console.log('err', err)
  })
}

const handleDelete = (index: number) => {
  tableData.value.splice(index, 1)
  handleEditHotList()
}

onMounted(() => {
  const el = (document.querySelector('.el-table') as HTMLElement).querySelectorAll('.el-table__inner-wrapper >.el-table__body-wrapper > .el-scrollbar > .el-scrollbar__wrap > .el-scrollbar__view > table > tbody')[0]

  new Sortable.create(el, {
    ghostClass: 'sortable-ghost',
    onEnd: evt => {
      // 要修改tableData.value和dom匹配
      const targetRow = tableData.value.splice(evt.oldIndex, 1)[0]
      // 修改移动问题的新增回答数
      if (evt.newIndex === 0) {
        targetRow.newAnswerCount = tableData.value[evt.newIndex].newAnswerCount + 3
      } else {
        targetRow.newAnswerCount = tableData.value[evt.newIndex - 1].newAnswerCount
      }

      tableData.value.splice(evt.newIndex, 0, targetRow)
      // 此时数据已经更新了，但是视图没有变化
      const newArr = tableData.value.slice(0)
      tableData.value = []
      nextTick(() => {
        tableData.value = newArr
        handleEditHotList()
      })
    }
  })
})



</script>

<style lang="scss">
.sortable-ghost {
  opacity: .8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>