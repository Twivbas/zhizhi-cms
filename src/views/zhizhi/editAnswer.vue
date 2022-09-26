<template>
  <el-form :inline="true" :model="selectData" class="demo-form-inline">
    <el-form-item label="问题">
      <el-input v-model="selectData.title" placeholder="请输入关键字" />
    </el-form-item>
    <el-form-item label="问题描述">
      <el-input v-model="selectData.desc" placeholder="请输入关键字" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" border style="width: 100%; margin-top: 20px">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <el-table :data="filterAnswersFun(props.row.answers)">
            <el-table-column label="回答" show-overflow-tooltip>
              <template #default="scope">
                <div>{{ scope.row.answer }}</div>
              </template>
            </el-table-column>
            <el-table-column label="回答ID" prop="answer_id" width="130" />
            <el-table-column label="回答用户" prop="nickName" width="100" />
            <el-table-column label="点赞数" prop="likes" width="80" />
            <el-table-column align="center">
              <template #header>
                <el-input v-model="search" size="small" placeholder="输入用户名搜索回答" />
              </template>
              <template #default="scope">
                <el-button size="small" type="danger" @click="handleDelete(scope.row, scope.$index)">删除回答</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="问题" width="250" />
    <el-table-column prop="question_id" label="问题ID" width="180" />
    <el-table-column prop="desc" label="问题描述" show-overflow-tooltip />
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button size="small" type="danger" @click="handleEditQuestion(scope.$index)">修改问题</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogFormVisible" title="修改问题">
    <el-form :model="form">
      <el-form-item label="问题ID：" :label-width="formLabelWidth">
        <el-input v-model="form.question_id" disabled />
      </el-form-item>
      <el-form-item label="问题：">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="问题描述：">
        <el-input v-model="form.desc" />
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
import { reactive, toRefs, ref, computed, onMounted, watch } from 'vue'
import { getQuestions, delAnswer, editQuestion } from '@/request/api'

interface ItableDataObj {
  question_id?: string
  title?: string
  desc?: string
  answers?: IAnswerObj[]
}

interface IAnswerObj {
  question_id?: string
  answer_id?: string
  nickName?: string
}

interface IselectDataObj {
  title?: string
  desc?: string
}

const state = reactive<{
  tableData: ItableDataObj[]
  form: ItableDataObj
  selectData: IselectDataObj
}>({
  tableData: [],
  form: {},
  selectData: {}
})
let { tableData, form, selectData } = toRefs(state)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const search = ref('')

// 计算属性函数代替过滤器，根据搜索内容过滤answers数组
const filterAnswersFun = computed(() => {
  return function (answers: IAnswerObj[]) {
    return answers.filter(
      (data: IAnswerObj) => {
        data.nickName = data.nickName || ''
        return !search.value ||
          data.nickName.toLowerCase().includes(search.value.toLowerCase())
      }
    )
  }
})
const getQuestionData = () => {
  getQuestions().then(res => {
    tableData.value = res.data
  }).catch(err => {
    console.log(err)
  })
}

getQuestionData()

const handleDelete = (row: IAnswerObj, index: number) => {
  delAnswer(row.answer_id as string).then(() => {
    // 删除tableData中选中的回答，但表格会收起来像刷新过
    // 这样不如直接获取新tableData简单了
    tableData.value.forEach((element: ItableDataObj) => {
      if (element.question_id === row.question_id) {
        (element.answers as []).splice(index, 1)
      }
    })
  }).catch(err => {
    console.log('err', err)
  })
}

const handleEditQuestion = (index: number) => {
  dialogFormVisible.value = true
  form.value = tableData.value[index]
}

const handleConfirm = () => {
  dialogFormVisible.value = false
  // 数据已修改，需要一个接口修改数据库数据
  editQuestion(form.value).then(res => {
    console.log(res)
  }).catch(err => {
    console.log('err', err)
  })
}

const handleClick = () => {
  search.value = ''
}

onMounted(() => {
  // 选中箭头i标签节点添加点击事件
  setTimeout(() => {
    const arrows = document.querySelector('.el-table__body')?.getElementsByTagName('i') as HTMLCollection
    for (let i = 0; i < tableData.value.length; i++) {
      (arrows[i] as HTMLElement).addEventListener('click', handleClick)
    }
  }, 100)
})

// 根据问题和描述查询内容
const onSubmit = () => {
  let arr = tableData.value
  if (selectData.value.title || selectData.value.desc) {
    if (selectData.value.title) {
      arr = arr.filter(data => (data.title as string).indexOf(selectData.value.title as string) !== -1)
    }
    if (selectData.value.desc) {
      arr = arr.filter(data => (data.desc as string).indexOf(selectData.value.desc as string) !== -1)
    }
  }
  tableData.value = arr
}
watch([() => selectData.value.title, () => selectData.value.desc], () => {
  if (selectData.value.title == '' && selectData.value.desc == '') {
    getQuestionData()
  }
})

</script>

<style scoped>
</style>