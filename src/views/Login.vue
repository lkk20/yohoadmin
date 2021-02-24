<template>
  <div class="container">
    <div class="login">
      <el-form status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input v-model="username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { adminLogin } from "@/network/request";
import router from "../router";
export default {
  setup() {
    let username = ref("");
    let password = ref("");
    const submitForm = async () => {
      if (username.value && password.value) {
        const { token, data } = await adminLogin({
          username: username.value,
          password: password.value,
        });
        sessionStorage.setItem("aid", data[0].aid);
        sessionStorage.setItem("token", token);
        router.replace("/home/list");
      }
    };
    const register = () => {
      router.push("/register");
    };
    return {
      submitForm,
      username,
      register,
      password,
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
  .login {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 300px;
    height: 200px;
    .loginregeister {
      text-align: right;
    }
  }
}
</style>
