<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
      <h2>后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model.trim="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model.trim="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
      <div class="notes">账号：admin 密码：123456</div>
      <div class="notes">账号：editor 密码：123456</div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const data = reactive({
  ruleForm: {
    username: 'admin',
    password: '123456',
  },
})
const { ruleForm } = toRefs(data)

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '账号的长度在3到10之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '密码的长度在3到10之间', trigger: 'blur' },
  ],
})
const ruleFormRef = ref<FormInstance>()

const router = useRouter()
const user = useUserStore()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      user.login(ruleForm.value).then(() => {
        router.push('/')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../../assets/bg.jpg");
  overflow: hidden;

  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
  }

  h2 {
    margin: 0 0 20px 230px;
  }

  .loginBtn {
    width: 100%;
  }
  .notes {
    margin-left: 120px;
  }
}
</style>
