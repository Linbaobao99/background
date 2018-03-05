<template>
    <div class="detail">
        <!-- 面包屑导航栏 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/admin' }">商品管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name:'list' }">商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表单内容 -->
        <el-form :model="form" ref="form" label-width="70px" class="detail_form" label-position="left">
            <el-form-item label="内容标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="form.sub_title"></el-input>
            </el-form-item>
            <el-form-item label="所属类别">
                <el-select v-model="form.category_id" placeholder="请选择活动区域">
                    <el-option v-for="item in category" :key="item.category_id" :label="item.title" :value="item.category_id">
                        <!-- option里面可以加标签覆盖label文本,但是label标签必须要,不然会报错 -->
                        <span>
                            <span v-if="item.class_layer != 1">|-</span>
                            <span>{{item.title}}</span>
                        </span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否发布">
                <el-switch v-model="form.true"></el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">
                <el-switch v-model="form.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="form.is_hot" active-text="推荐"></el-switch>
            </el-form-item>
            <el-form-item label="上传封面">
                <!-- action 用来设置上传接口,list-style用来设置文件列表样式 -->
                <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadimg" :file-list="form.imgList" list-type="picture" :on-success="updateImg">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="上传附件">
                <el-upload class="upload-demo" action="http://127.0.0.1:8899/admin/article/uploadfile" :file-list="form.fileList" :on-success="updateFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品货号">
                <el-input v-model="form.goods_no"></el-input>
            </el-form-item>
            <el-form-item label="库存数量">
                <el-input v-model="form.stock_quantity"></el-input>
            </el-form-item>
            <el-form-item label="市场价格">
                <el-input v-model="form.market_price"></el-input>
            </el-form-item>
            <el-form-item label="销售价格">
                <el-input v-model="form.sell_price"></el-input>
            </el-form-item>
            <el-form-item label="内容摘要">
                <el-input type="textarea" v-model="form.zhaiyao"></el-input>
            </el-form-item>
            <el-form-item label="详细内容">
                <quillEditor v-model="form.content"></quillEditor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交保存</el-button>
                <el-button @click="$router.go(-1)">返回上一页</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      //表单数据
      form: {},
      //分类数据
      category: [],
      id: this.$route.params.id
    };
  },
  methods: {
    //根据id获取商品信息
    getGoods() {
      this.$axios.get(this.$api.gsDetail + this.id).then(res => {
        if (res.data.status == 0) {
          this.form = res.data.message;

          this.form.category_id = +this.form.category_id;
          //   console.log(this.form.category_id);
        }
      });
    },
    //获取商品分类数据
    getCategory() {
      this.$axios.get(this.$api.ctList + "goods").then(res => {
        if (res.data.status == 0) {
          this.category = res.data.message;
        }
      });
    },
    //上传封面
    updateImg(data) {
      //我们的后端接口只能接受一张封面
      //   this.form.imgList = [];
      //   this.form.imgList.push(data);//把接口返回的数据保存起来,供将来保存起来
      this.form.imgList = [data];
    },
    //上传附件
    updateFile(data) {
      this.form.fileList.push(data);
    },
    //保存按钮
    submitForm() {
      this.$axios.post(this.$api.gsEdit + this.id, this.form).then(res => {
        if (res.data.status == 0) {
          this.$alert("修改成功", "提示", {
            callback: () => {
              this.getGoods();
            }
          });
        }
      });
    }
  },
  created() {
    this.getGoods();
    this.getCategory();
  },
  components: {
    quillEditor
  }
};
</script>

<style scoped lang="less">
.detail {
  .el-breadcrumb {
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }
  & .el-form {
    width: 700px;
  }
}
</style>