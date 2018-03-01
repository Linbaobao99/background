import Vue from 'vue'

import App from './component/App.vue'

import router from './router'

import 'normalize.css'

import './less/common.less'

//不是vue插件,导入之后只能在当前模块使用
import axios from 'axios'

import api,{ domain } from './js/api.js'
//配置默认域名,这样请求的时候就不用在url里加域名了
axios.defaults.baseURL = domain;
//因为我们调用的接口跨域了,默认情况下接口给我们设置cookie无效,为了让它有效,我们必须添加此设置
axios.defaults.withCredentials = true;
//为了使用方便,把axios和api添加到Vue原型,将来vue组件就可以直接使用
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;


new Vue({
    el:'#app',
    render: createElement => createElement(App),
    router:router
})