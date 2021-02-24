
<template>
  <div class="edit">
    <el-form label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="productInfo.title"></el-input>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox
          label="促销"
          v-model="productInfo.issale"
          :true-label="1"
          :false-label="0"
        ></el-checkbox>
        <el-checkbox
          label="Top100"
          v-model="productInfo.istop"
          :true-label="1"
          :false-label="0"
        ></el-checkbox>
        <el-checkbox
          label="团购"
          v-model="productInfo.istuan"
          :true-label="1"
          :false-label="0"
        ></el-checkbox>
        <el-checkbox
          label="推荐"
          v-model="productInfo.isrecommend"
          :true-label="1"
          :false-label="0"
        ></el-checkbox>
      </el-form-item>
      <el-form-item label="种类">
        <el-cascader
          v-model="cate"
          :options="options"
          :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="productInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="原价">
        <el-input
          v-model="productInfo.oldprice"
          :disabled="productInfo.issale"
        ></el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input type="number" v-model="productInfo.num" :min="1"></el-input>
      </el-form-item>
      <el-form-item label="图片链接">
        <el-input v-model="productInfo.image"></el-input>
      </el-form-item>
      <el-form-item label="图片预览">
        <div class="block">
          <el-image
            style="width: 100%; height: auto"
            :src="productInfo.image"
            fit="fill"
            :alt="productInfo.title"
            lazy
          >
            <img :src="productInfo.image" :alt="productInfo.title" />
          </el-image>
        </div>
      </el-form-item>
      <el-form-item label="轮播图">
        <el-input
          type="textarea"
          autosize
          v-model="productInfo.swiperimage"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片预览">
        <div class="swipers">
          <el-image
            v-for="url in swiperArr"
            :key="url"
            style="width: 100%; height: auto"
            :src="url"
            fit="fill"
            :alt="productInfo.title"
            lazy
          >
            <img :src="url" :alt="productInfo.title" />
          </el-image>
        </div>
      </el-form-item>
      <el-form-item label="详情页">
        <el-input
          type="textarea"
          autosize
          v-model="productInfo.detailmap"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片预览">
        <div class="swipers">
          <el-image
            v-for="url in detailmapArr"
            :key="url"
            style="width: 100%; height: auto"
            :src="url"
            fit="fill"
            :alt="productInfo.title"
            lazy
          >
            <img :src="url" :alt="productInfo.title" />
          </el-image>
        </div>
      </el-form-item>
      <el-form-item label="详细信息">
        <el-input
          type="textarea"
          autosize
          v-model="productInfo.productinfo"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitNewProduct">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import router from "@/router";
import { reactive, toRefs, computed } from "vue";
import { addProduct } from "@/network/request";
import { ElMessage } from "element-plus";
import { totalCates } from "@/assets/js/cate";
export default {
  name: "EditProduct",
  setup(props) {
    const formData = reactive({
      productInfo: {},
    });
    const options = totalCates;
    //种类
    let cate = computed({
      get: () => {
        return formData.productInfo.cate;
      },
      set: (value) => {
        formData.productInfo.cate = value[1];
      },
    });
    const swiperArr = computed({
      get: () => {
        return formData.productInfo.swiperimage
          ? formData.productInfo.swiperimage.split(",")
          : [];
      },
    });
    const detailmapArr = computed({
      get: () => {
        return formData.productInfo.detailmap
          ? formData.productInfo.detailmap.split(",")
          : [];
      },
    });
    const productid = router.currentRoute.value.params.pid;
    //提交
    const submitNewProduct = () => {
      const {
        title,
        cate,
        price,
        image,
        swiperimage,
        detailmap,
        productinfo,
        num,
      } = formData.productInfo;
      if (
        title &&
        cate &&
        price &&
        image &&
        swiperimage &&
        detailmap &&
        productinfo &&
        num
      ) {
        addProduct({ newData: formData.productInfo }).then((res) => {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "success",
          });
          router.back();
        });
      } else {
        ElMessage({
          showClose: true,
          message: "请把信息填写完整",
          type: "waring",
        });
      }
    };
    return {
      ...toRefs(formData),
      swiperArr,
      detailmapArr,
      submitNewProduct,
      options,
      cate,
    };
  },
};
</script>

<style scopes lang='less'>
.edit {
  padding-top: 50px;
  .el-form {
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 500px;
    .block {
      width: 300px;
      img {
        width: 100%;
      }
    }
    .swipers {
      height: 400px;
      width: 400px;
      overflow-y: scroll;
      img {
        width: 100%;
      }
    }
  }
}
</style>
