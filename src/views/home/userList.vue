<template>
  <div>
    <el-table :data="tableData" height="500">
      <el-table-column prop="userid" label="编号" width="140">
      </el-table-column>
      <el-table-column prop="username" label="名字" width="120">
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="200"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="pagesize"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { getAllUserInfo } from "@/network/request";
export default {
  name: "UserList",

  setup(props) {
    const totalData = reactive({
      tableData: [],
      total: 0,
    });
    const pagesize = 10;
    onMounted(async () => {
      const { data, total } = await getAllUserInfo({
        start: 0,
        limit: pagesize,
      });

      totalData.tableData = data;
      totalData.total = total;
    });
    const currentChange = async (current) => {
      const { data } = await getAllUserInfo({
        start: (current - 1) * pagesize,
        limit: pagesize,
      });
      totalData.tableData = data;
    };
    return {
      ...toRefs(totalData),
      currentChange,
      pagesize,
    };
  },
};
</script>

<style scopes lang='less'>
.el-pagination {
  text-align: center;
}
</style>
