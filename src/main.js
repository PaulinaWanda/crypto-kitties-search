import 'babel-polyfill'
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import Vue from 'vue'
import App from './App'

import { store } from './store/store.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App),
    store
})
