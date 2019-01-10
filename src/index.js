import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';
import YDUI from 'vue-ydui';

import './assets/js/flexible';
import './assets/styles/global.styl';
import 'vue-ydui/dist/ydui.rem.css';
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';

import {post,get} from './assets/js/http';

Vue.prototype.$post=post;
Vue.prototype.$get=get;
window.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading,
};

import './assets/js/sdk';

import createRouter from './router/router';
import createStore from './store/store';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(YDUI);

const router = createRouter();
const store = createStore();



new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
