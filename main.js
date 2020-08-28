import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.serverUrl = "http://127.0.0.1:8888/v1";

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
