<template>
    <div class="aside">
        <el-menu default-active="2" class="el-menu-vertical-demo"  background-color="#ffbbaa" text-color="#fff" active-text-color="#ffd04b">
            <!-- 预留一个一级菜单, 将来通过v-for动态生成多组一级菜单 -->
            <!-- 这里的index用来给当前菜单起个名字, 以区分 -->
            <el-submenu v-for="item in menu" :key="item.title" :index="item.title">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{item.title}}</span>
                </template>

                <el-menu-item v-for="subitem in item.children" :key="subitem.title" :index="subitem.title">
                    <router-link :to="subitem.path"> <i class="el-icon-document"></i>{{subitem.title}}</router-link>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data(){
        return {
            //左侧导航列表数据
            menu:[
                {
                    title:'商品管理',
                    children:[
                        {title:'内容管理',path:'/admin/goods/list'},
                        {title:'类别管理',path:'/admin/goods/category'},
                        {title:'评论管理',path:'/admin/goods/comment'},
                    ]
                },
                {
                    title:'订单管理',
                    children:[
                        {title:'内容管理',path:'/admin/goods/a'},
                        {title:'类别管理',path:'/admin/goods/b'},
                        {title:'评论管理',path:'/admin/goods/c'},
                    ]
                }
            ]
        }
    }
};
</script>

<style scoped lang="less">
.el-menu{
    border: none;
    & .el-submenu{
        & .el-menu-item{
            margin-left: 15px;
        }
    }
}

</style>