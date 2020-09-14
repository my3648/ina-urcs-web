// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Highcharts from "highcharts";
// window.eventBus = new Vue();

// import  HighchartsVue  from "highcharts-vue";
// import stockInit from "highcharts/modules/stock";

// stockInit(Highcharts);
import axios from 'axios'
// import Vue2OrgTree from 'vue-tree-color'

// Vue.use(Vue2OrgTree)


Vue.use(ElementUI);
// Vue.use(HighchartsVue)
window.Highcharts = Highcharts;


axios.defaults.baseURL = "http://139.224.24.175:8001"//其他地方请求地址可以省略域名 
// axios.defaults.baseURL = "http://139.224.24.175:3333"//其他地方请求地址可以省略域名 
// axios.defaults.baseURL = "http://47.101.67.237:4040"//其他地方请求地址可以省略域名 
// axios.defaults.baseURL = "http://47.101.67.237:5001"//其他地方请求地址可以省略域名 


// function groupJson(){

//   try{
//     axios.defaults.baseURL= JSON.parse(localStorage.getItem('group')).href
    
//   }catch(e){
//     axios.defaults.baseURL=''
//   }
//   console.log(axios.defaults.baseURL);
// }
// groupJson()

axios.interceptors.request.use(function(config) {

  if (!config.url.endsWith('/')) {
    config.headers['token'] = localStorage.getItem('token')
    config.headers['username'] = localStorage.getItem('username')
    config.headers['group'] = localStorage.getItem('group')
  }
  
  return config
})


// // 响应拦截器
axios.interceptors.response.use(function(response) {


  if(!localStorage.getItem('token')){ 
    router.push('/')
  }
  

  return response
},err=>{
  if (err.response.status === 401) {

    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }
  console.log('err', err)
  return Promise.reject(err) //这里不返回 ，请求失败（500）时会走then方法
})
import AMap from "vue-amap";

// import Vue from "vue";
Vue.use(AMap);
AMap.initAMapApiLoader({
  // 申请的高德key
  key: "146f38cff16fee22715f107edad81eac",
  // 插件集合
  plugin: [""]
});

Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.prototype.Highcharts=Highcharts



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
