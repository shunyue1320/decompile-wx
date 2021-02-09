import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Button, Row, Col, Tooltip } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.config.productionTip = false;

app.use(Button)
app.use(Row)
app.use(Col)
app.use(Tooltip)

app.use(router)

app.mount('#app')