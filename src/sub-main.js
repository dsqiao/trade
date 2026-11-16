import { createApp } from 'vue';
import SubApp from './SubApp.vue';
import router from './router/sub.js';
import './style.css';

createApp(SubApp)
  .use(router)
  .mount('#app');
