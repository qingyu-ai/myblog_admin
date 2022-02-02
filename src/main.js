import Vue from 'vue'
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'

Vue.config.productionTip = false

//应用插件
Vue.use(VueRouter)

// 配置axios
axios.defaults.baseURL = 'http://localhost:8080/bear_blog/'
axios.defaults.timeout = 8000
Vue.prototype.$http = axios

Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// 请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = JSON.parse(window.localStorage.getItem('token'))
  return config
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
