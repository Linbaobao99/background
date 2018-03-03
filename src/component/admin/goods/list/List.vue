<template>
  <div class="list">
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 按钮和搜索框 -->
    <section class="list_btns">
      <el-button plain size="mini" icon="el-icon-plus">新增</el-button>
      <el-button plain size="mini" icon="el-icon-check">全选</el-button>
      <el-button plain size="mini" icon="el-icon-close" @click="del">删除</el-button>
      <div class="demo-input-suffix list_right">
        <el-input placeholder="请输入商品名称" prefix-icon="el-icon-search" size="mini" v-model="searchData.searchvalue" @blur="search">
        </el-input>
      </div>
    </section>
    <!-- 大表格 -->
    <!-- data是用来匹配数据的 -->
    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="light" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!-- label用来设置当前列的表头 -->
      <!-- 里面的template用来自定义表格中的内容和数据 -->
      <el-table-column label="标题">
        <template slot-scope="scope">
          <router-link style="color:#68f" :to="{name:'goodsDetail'}">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <!-- 当前列要展示对象中的那个字段的值,就配置prop属性为那个字段名 -->
      <el-table-column prop="categoryname" label="所属类别" width="100">
      </el-table-column>
      <el-table-column prop="stock_quantity" label="库存" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="sell_price" label="销售价" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="属性" width="100" show-overflow-tooltip>
        <template slot-scope="scope">三个图标</template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <router-link style="color:#68f" :to="{name:'goodsDetail'}">修改</router-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData:{
        pageIndex:1,
        pageSize:10,
        searchvalue:''
      },
      selectionGoodsList:[],
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },

  methods: {
    //删除
    handleSelectionChange(val) {
      this.selectionGoodsList = val;
    },
    del(){
      let delIds = this.selectionGoodsList.map(v=>v.id)//提取所有被选中的商品的id
      this.$axios.get(this.$api.gsDel+delIds).then((res)=>{
        if(res.data.status==0){
          this.getGoodsData();
        }
      })
    },
    //搜索
    search(){
      this.getGoodsData()
    },
    getGoodsData() {
      //这个接口需要指定页,pageSize指定每页数量,searchvalue用于商品搜索
      let api = this.$api.gsList + "?pageIndex="+this.searchData.pageIndex+"&pageSize="+this.searchData.pageSize+"&searchvalue="+this.searchData.searchvalue;
      this.$axios
        .get(api)
        .then(res => {
          if (res.data.status == 0) {
            this.tableData3 = res.data.message;
          }
        });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /* 分页 */
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // }
  },
  //页面一上来就自动调用接口获取表格数据进行展示
  created() {
    this.getGoodsData();
  }
};
</script>

<style scoped lang="less">
.list {
  .el-breadcrumb {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  //&是父的类名
  &_btns {
    margin-top: 20px;
    .list_right {
      float: right;
      width: 200px;
    }
  }
  .el-table {
    margin-top: 20px;
    margin-bottom:20px;
  }
}
</style>