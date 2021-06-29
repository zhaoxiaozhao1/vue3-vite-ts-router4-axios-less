import { createApp } from 'vue'
import App from './App.vue'
import {router} from './route'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';


const app = createApp(App)

// 注入路由
app.use(router)
app.use(VueAxios, axios)
app.use(ElementPlus);

app.mount('#app')
