<template>
  <div class="loginBox">
    <el-form ref="formRef" :model="formModel" label-width="120px" class="demo-dynamic">
      <el-form-item prop="username" label="用户名" :rules="{required: true,message: '请输入用户名',trigger: 'blur',}">
        <el-input v-model="formModel.username" />
      </el-form-item>
      <el-form-item prop="password" label="密码" :rules="{required: true,message: '请输入密码',trigger: 'blur',}">
        <el-input v-model="formModel.password" type="password" show-password />
      </el-form-item>

      <el-form-item prop="isConfirmAgreement">
        <el-checkbox v-model="formModel.isConfirmAgreement" label="是否同意用户协议" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { userLogin } from '../../api';
import { setStronge } from '../../utils/storage';
import { useRouter } from 'vue-router';

const router = useRouter();
const formRef = ref<FormInstance>();
const formModel = reactive({ username: '', password: '', isConfirmAgreement: false });

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return false;
    // 判断是否同意
    if (!formModel.isConfirmAgreement) {
      ElMessage.error('请务必仔细阅读用户协议，并同意该协议');
      return false
    }
    // 正确的逻辑-登录
    const res = await userLogin(formModel.username, formModel.password, formModel.isConfirmAgreement);
    if (res && res != '') {
      // 成功登录
      // 存 token
      setStronge('token', res);
      // 跳转首页
      router.push({ path: '/' })
    }
  });
};
</script>

<style lang="scss" scoped>
.loginBox {
  width: 100%;
  height: 100%;
}
</style>