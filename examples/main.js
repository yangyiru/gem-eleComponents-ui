import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/index';
import demoShow from './components/demo-show.vue';
import gemEleUI from '../packages/index';
import '../packages/theme-defalut/index.scss';

Vue.config.productionTip = false;
Vue.component('demo-show', demoShow);
Vue.use(ElementUI);
Vue.use(gemEleUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
