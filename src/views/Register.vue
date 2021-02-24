<template>
  <div class="container">
    <div class="register">
      <el-form status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="名字" prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resizeForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { adminRegister } from "@/network/request";
import router from "../router";
import { ElMessage } from "element-plus";
export default {
  setup() {
    let username = ref("");
    let password = ref("");
    let name = ref("");
    const submitForm = async () => {
      if (username.value && password.value && name.value) {
        const result = await adminRegister({
          username: username.value,
          password: password.value,
          name: name.value,
        });
        if (result.code === 200) {
          ElMessage({
            showClose: true,
            message: "恭喜你,注册成功,请登录",
            type: "success",
          });
          router.replace("/login");
        }
      }
    };
    const resizeForm = () => {
      username.value = "";
      password.value = "";
      name.value = "";
    };
    return {
      submitForm,
      username,
      resizeForm,
      password,
      name,
    };
  },
};
</script>

<style scopes lang='less'>
.container {
  width: 100vw;
  height: 100vh;
  min-width: 800px;
  min-height: 600px;
  background-color: rgb(152, 235, 207);
  .register {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 300px;
    height: 200px;
  }
}
</style>
