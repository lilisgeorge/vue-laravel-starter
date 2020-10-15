import { createApp } from 'vue';
import { Field, Form } from 'vee-validate';
import * as Components from '@/components/Ui';
import { store } from './store';
import { router } from './router';
import App from './App.vue';

const app = createApp(App);

app.config.productionTip = false;

app.component('Form', Form);
app.component('Field', Field);
Object.keys(Components).forEach((name) => {
  app.component(name, Components[name]);
});

store.dispatch({
  type: 'fetchUser',
}).finally(() => {
  app.use(store);
  app.use(router);
  app.mount('#app');
});
