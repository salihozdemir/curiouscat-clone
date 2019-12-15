import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {
  Card,
  Form,
  Input,
  Icon,
  Button,
  Checkbox,
  Row,
  Col,
  Tooltip,
  Alert,
  Layout,
  Menu,
  Breadcrumb,
  Modal,
  List,
  Comment,
  Avatar,
  Switch

} from 'ant-design-vue';

Vue.prototype.$form = Form;
Vue.config.productionTip = false;

Vue.use(Card);
Vue.use(Form);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tooltip);
Vue.use(Alert);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Modal);
Vue.use(List);
Vue.use(Comment);
Vue.use(Avatar);
Vue.use(Switch);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
