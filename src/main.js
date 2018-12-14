import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './service/http'
import 'lib-flexible/flexible.js'
import 'reset.less'

Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
