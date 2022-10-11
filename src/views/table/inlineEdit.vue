<template>
  <div class="app-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template v-slot="{row}">
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="Author">
        <template v-slot="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template v-slot="{row}">
          <!-- <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" /> -->
          <el-icon v-for="(o, i) in Array.from({length: +row.importance})" :key="i"><StarFilled /></el-icon>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template v-slot="{row}">
          <el-tag :type="row.status === 'published' ? 'success': ''">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template v-slot="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" />
            <el-button class="cancel-btn"  type="warning" @click="cancelEdit(row)">
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template v-slot="{row}">
          <el-button v-if="row.edit" type="success" 
            @click="confirmEdit(row)">
            Ok
          </el-button>
          <el-button v-else type="primary"  @click="edithandler(row)">
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchList } from '@/request/api'
import { IObjectInt } from '@/mock/article'

const list = ref()
const tempTitle = ref('')
const listQuery = {
  page: 4,
  limit: 10
}
const getList = async () => {
  const { data } = await fetchList(listQuery)
  const items = data.items
  list.value = items.map((v: IObjectInt) => {
    v.edit = false
    return v
  })
}

const edithandler = (row: IObjectInt) => {
  row.edit=!row.edit
  tempTitle.value = row.title
}
const cancelEdit = (row: IObjectInt) => {
  row.edit = false
  row.title = tempTitle.value
  tempTitle.value = ''
}
const confirmEdit = (row: IObjectInt) => {
  row.edit = false
  tempTitle.value = ''
}
onMounted(() => {
  getList()
})

</script>

<style lang="scss" scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>