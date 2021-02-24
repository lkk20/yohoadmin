<template>
  <div>
    <div>
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
import { reactive, onMounted, toRefs } from "vue";
import { getAllProducts } from "@/network/request";
import router from "../../router";
import { ElMessage } from "element-plus";
import ProductList from "@/components/ProductList";
export default {
  name: "List",
  components: { ProductList },
  setup(props) {
    const totalData = reactive({
      total: 0,
      tableData: [],
    });
    onMounted(() => {
      getData(0, 10);
    });
    const getData = async (start, limit) => {
      const { data, total } = await getAllProducts({
        start: start,
        limit: limit,
      });
      totalData.total = total;
      totalData.tableData = data;
    };
    const deleteData = (index) => {
      totalData.tableData.splice(index, 1);
    };
    return {
      ...toRefs(totalData),
      getData,
      deleteData,
    };
  },
};
</script>

<style scopes lang='less'>
</style>
