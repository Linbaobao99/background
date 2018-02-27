import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../component/login/Login.vue'
import Register from '../component/register/Register.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import Button from '../component/subcom/Button.vue'

Vue.use(VueRouter)
Vue.use(ElementUI)

export default new VueRouter({
    routes:[
        {name:'login',path:'/login',component:Login},
        {name:'register',path:'/register',component:Register},
        {name:'button',path:'/button',component:Button}
    ]
})

