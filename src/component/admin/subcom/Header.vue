<template>
    <div class="header">
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                你好,{{uname}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">修改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
  data() {
    return {
      uname: JSON.parse(localStorage.getItem("name")).uname
    };
  },
  methods: {
    logout(){
        this.$axios.get(this.$api.logout).then((res)=>{
            if(res.data.status==0){
                this.$router.push({name:"login"});
                localStorage.removeItem("name");
            }
        })
    },
    handleCommand(command) {
        if(command == "b"){
            this.logout();
        }
    }
  }
};
</script>

<style scoped>
.header{
    text-align: right;
}
</style>