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
  Switch,
  message,
  Popconfirm,
  Skeleton,
  Spin,
  ConfigProvider,
  Badge

} from 'ant-design-vue';

Vue.prototype.$form = Form;
Vue.prototype.$message = message;
Vue.prototype.$confirm = Modal.confirm;
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
Vue.use(Popconfirm);
Vue.use(Skeleton);
Vue.use(Spin);
Vue.use(ConfigProvider);
Vue.use(Badge);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
