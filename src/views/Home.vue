<template>
  <el-container class="home">
    <el-header>
      <span>{{ adminName }}</span>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
          :default-openeds="[`${breadcrumb.opends}`]"
          :unique-opened="true"
          :router="true"
        >
          <el-submenu index="products">
            <template #title><i class="el-icon-present"></i>商品管理</template>
            <el-menu-item index="/home/list">商品列表</el-menu-item>
            <el-menu-item index="/home/news">添加新品</el-menu-item>
            <el-menu-item index="/home/search">查找商品</el-menu-item>
          </el-submenu>
          <el-submenu index="order">
            <template #title><i class="el-icon-menu"></i>订单管理</template>
            <el-menu-item index="/home/waitpay">待付款</el-menu-item>
            <el-menu-item index="/home/waitreceive">待收货</el-menu-item>
            <el-menu-item index="/home/waitdeliver">待发货</el-menu-item>
            <el-menu-item index="/home/success">已成交</el-menu-item>
          </el-submenu>
          <el-submenu index="user">
            <template #title><i class="el-icon-s-custom"></i>用户管理</template>
            <el-menu-item index="userlist" data-url="/home/list"
              >用户列表</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>{{ breadcrumb.first }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            breadcrumb.second
          }}</el-breadcrumb-item> </el-breadcrumb
        ><router-view></router-view
      ></el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref, computed } from "vue";
import { getAdminInfo } from "@/network/request";
import router from "../router";
export default {
  name: "Home",
  components: {},
  setup(props) {
    let adminName = ref("管理员");
    onMounted(async () => {
      const { data } = await getAdminInfo({
        aid: sessionStorage.getItem("aid"),
      });
      adminName.value = data[0].name;
    });
    //面包屑导航
    const breadcrumb = computed(() => {
      const navBar = {
        first: "商品管理",
        second: "商品列表",
        opends: "products",
      };
      switch (router.currentRoute.value.path) {
        case "/home/list":
          navBar.first = "商品管理";
          navBar.second = "商品列表";
          navBar.opends = "products";
          break;
        case "/home/news":
          navBar.first = "商品管理";
          navBar.second = "添加新品";
          navBar.opends = "products";
          break;
        case "/home/userlist":
          navBar.first = "用户管理";
          navBar.second = "用户列表";
          navBar.opends = "user";
          break;
        case "/home/search":
          navBar.first = "商品管理";
          navBar.second = "查找商品";
          navBar.opends = "products";
          break;
      }
      return navBar;
    });
    return { adminName, breadcrumb };
  },
};
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  .el-header {
    text-align: right;
    span {
      font-size: 12px;
    }
    background-color: #b3c0d1;
    color: #333;
  }
  .el-container {
    .el-aside {
      color: #333;
    }
  }
}
</style>
