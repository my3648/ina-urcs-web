// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
// window.eventBus = new Vue();

// import  HighchartsVue  from "highcharts-vue";
// import stockInit from "highcharts/modules/stock";

// stockInit(Highcharts);
import axios from 'axios'
// import Vue2OrgTree from 'vue-tree-color'

// Vue.use(Vue2OrgTree)


Vue.use(ElementUI);
Vue.use(HighchartsVue);
// Vue.use(HighchartsVue)
window.Highcharts = Highcharts;


// axios.defaults.baseURL = "http://127.0.0.1:5000/" //测试版
axios.defaults.baseURL = "http://139.196.196.221:3011/" //新版 高力还未完成
// axios.defaults.baseURL = "http://139.224.24.175:8001" //旧版 欧阳正在使用 components3
// axios.defaults.baseURL = "http://139.224.24.175:3333" 
// axios.defaults.baseURL = "http://47.101.67.237:4040" 
// axios.defaults.baseURL = "http://47.101.67.237:5001" 


axios.interceptors.request.use(function (config) {

  if (!config.url.endsWith('/')) {
    config.headers['token'] = localStorage.getItem('token')
    config.headers['username'] = localStorage.getItem('username')
    config.headers['userGroup'] = localStorage.getItem('userGroup')
    // config.headers['ucos'] = localStorage.getItem('ucos')
    // config.headers['urcs'] = localStorage.getItem('urcs')
    // config.headers['ucdm'] = localStorage.getItem('ucdm')
  }

  return config
})


// // 响应拦截器
axios.interceptors.response.use(function (response) {
// console.log(response);

  if (!localStorage.getItem('token')) {
    router.push('/')
  }


  return response
}, err => {
  if (err.response.status === 401) {

    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userGroup')
    localStorage.removeItem('urcs')
    localStorage.removeItem('ucos')
    localStorage.removeItem('ucdm')
  }
  console.log('err', err)
  return Promise.reject(err) //这里不返回 ，请求失败（500）时会走then方法
})
import AMap from "vue-amap";

// import Vue from "vue";
Vue.use(AMap);
Vue.prototype.infoModal = function (flg, info) {
  this.$alert(info, flg=="ok"?'提交成功':'提交失败', {
    // confirmButtonText: '确定',
    // cancelButtonText: '取消',
    type: flg=="ok"?'success':'error',
    closeOnClickModal:true
  })
}
Vue.prototype.warnModal = function (info) {
  this.$alert(info, '提交失败', {
    type: 'warning',
    closeOnClickModal: true
  })
}
Vue.prototype.msgModal = function (info) {
  this.$alert(info, '信息', {
    type: 'info',
    closeOnClickModal: false, //alert 默认false
    showConfirmButton: false,
    showCancelButton: false,

  })
}
Vue.prototype.onlyNumber = function (e) {
  e.target.value = e.target.value.replace(/[^\d|\.|\-]/g, "");
}
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
  components: {
    App
  },
  template: '<App/>'
})
