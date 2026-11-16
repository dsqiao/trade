import { createApp } from 'vue';
import SubApp from './SubApp.vue';
import router from './router/sub.js';
import './style.css';

document.documentElement.classList.add('standalone-site');

createApp(SubApp)
  .use(router)
  .mount('#app');
