<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="productid" label="ID" width="50">
      </el-table-column>
      <el-table-column prop="image" label="图片" width="60">
        <template #default="scope">
          <el-image :src="scope.row.image" :alt="scope.row.title">
            <img :src="scope.row.image" :alt="scope.row.title" />
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="cate" label="种类" width="70"> </el-table-column>
      <el-table-column prop="price" label="价格" width="70"> </el-table-column>
      <el-table-column prop="num" label="库存" width="70"> </el-table-column>
      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
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
import { computed } from "vue";
import { deleteProduct } from "@/network/request";
import router from "@/router";
import { ElMessage } from "element-plus";
export default {
  name: "Search",
  props: {
    tableData: Object,
    total: Number,
  },
  setup(props, { emit }) {
    const tableData = computed({
      get: () => props.tableData,
    });
    const total = computed({
      get: () => props.total,
    });
    const pagesize = 10;
    //编辑
    const handleEdit = (index, row) => {
      router.push(`/edit/${row.productid}`);
    };
    //删除
    const handleDelete = (index, row) => {
      deleteProduct({ pid: row.productid }).then((res) => {
        emit("delete-emit", index);
        ElMessage.success({
          message: res.message,
          type: "success",
        });
      });
    };
    const currentChange = (value) => {
      emit("getData-emit", (value - 1) * pagesize, pagesize);
    };
    return {
      handleEdit,
      handleDelete,
      pagesize,
      currentChange,
      tableData,
      total,
    };
  },
};
</script>

<style scopes lang='less'>
.el-table-column {
  text-overflow: ellipsis;
  overflow: hidden;
}
.el-pagination {
  text-align: center;
}
</style>
