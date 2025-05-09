import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index.js";
import "./style.css";
import 'tdesign-vue-next/es/style/index.css';
import TDesign from 'tdesign-vue-next';

const app = createApp(App);

app.use(router);
app.use(TDesign);

app.mount("#app");
