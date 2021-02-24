<template>
  <div>
    <div class="search">
      <el-input
        v-model="searchValue"
        size="medium"
        prefix-icon="el-icon-search"
        placeholder="请输入内容"
      >
      </el-input
      ><el-button type="primary" @click="searchBtn">主要按钮</el-button>
    </div>
    <div v-show="total">
      <product-list
        v-bind:tableData="tableData"
        v-bind:total="total"
        @getData-emit="getData"
        @delete-emit="deleteData"
      ></product-list>
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import { reactive, toRefs, ref } from "vue";
import { searchData } from "@/network/request";
import router from "../../router";
import { ElMessage } from "element-plus";
export default {
  name: "Search",
  components: {
    ProductList,
  },
  setup(props) {
    const totalData = reactive({
      total: 0,
      tableData: [],
    });
    const searchValue = ref("");
    const pagesize = 10;
    const getData = async (start, size) => {
      const { data, total } = await searchData({
        key: searchValue.value,
        start: start,
        size: size,
      });
      totalData.total = total;
      totalData.tableData = data;
    };
    const searchBtn = () => {
      getData(0, 10);
    };
    //删除
    const deleteData = (index) => {
      totalData.tableData.splice(index, 1);
    };
    return {
      deleteData,
      ...toRefs(totalData),
      pagesize,
      getData,
      searchValue,
      searchBtn,
    };
  },
};
</script>

<style scopes lang='less'>
.search {
  margin: 30px 0;
  width: 500px;
  display: flex;
  .el-input {
    flex: 6;
    display: inline-block;
  }
  .el-button {
    flex: 1;
  }
}
.el-table-column {
  text-overflow: ellipsis;
  overflow: hidden;
}
.el-pagination {
  text-align: center;
}
</style>
