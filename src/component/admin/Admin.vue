<template>
    <div class="admin">
        <el-container>
            <el-aside width="200px">
                <!-- 公共左侧 -->
                <app-aside></app-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <!-- 公共的头部 -->
                    <app-header></app-header>
                </el-header>
                <el-main>
                    <!-- 变化的后台管理子页面 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>   
    </div>
</template>

<script>
import Header from './subcom/Header.vue'
import Aside from './subcom/Aside.vue'
    export default {
        //注册子组件
        components:{
            appHeader:Header,
            appAside:Aside
        }
    }
</script>

<style scoped lang="less">
.admin{
    height: 100%;
    color: #333;
    .el-container{
        height: 100%;
    }
    .el-header{
        line-height: 60px;
        color: #333;
        background-color: #bcf;
    }
    .el-aside {
        text-align: center;
        background-color: #fba;
    }
    .el-main{
        background-color: #bfa;
    }
} 
</style>