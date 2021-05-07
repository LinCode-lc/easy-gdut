import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/common.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import store from './store'
// import format from 'date-fns/format'
import relativeTime from 'dayjs/plugin/relativeTime';
import '@/permission'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Antd from 'ant-design-vue';
import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.use(DatePicker);
Vue.use(BootstrapVue)
Vue.use(Antd);
// 国际化
import 'dayjs/locale/zh-cn'
const dayjs = require('dayjs');

// 相对时间插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // use locale globally
dayjs().locale('zh-cn').format() // use locale in a specific instance

Vue.prototype.dayjs = dayjs;//可以全局使用dayjs
Vue.use(ElementUI);
Vue.use(Buefy)
Vue.config.productionTip = false

// const cors = require('koa2-cors');
// Vue.use(cors());

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


