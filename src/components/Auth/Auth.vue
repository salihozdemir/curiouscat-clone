<template>
  <div class="divLogin">
    <transition name="slideContainer" mode="out-in" appear>
      <component :is="getActiveComponent" key="authComponent"></component>
    </transition>
  </div>
</template>
<script>
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import api from '../../services/index';
//import tools from '../../tools/index';
import { mapGetters } from 'vuex';

export default {
  components: {
    appLogin: Login,
    appSignup: Signup
  },
  data() {
    return {
      isUser: false
    };
  },
  computed: {
    ...mapGetters(['getActiveComponent'])
  },
  //TODO: Kullanıcı email veya username ile giriş yapabilsin.
  methods: {
    async onSubmit() {
      let connectionString = '';
      if (this.isUser) {
        connectionString = '/user/login';
      } else {
        connectionString = '/user/signup';
      }
      const userToken = await api().post(connectionString, {
        email: this.user.email,
        username: this.user.username,
        password: this.user.password
      });
      console.log(userToken.response.data.message);

      //tools.cookie.set('access_token', userToken.data.token);
    }
  }
};
</script>

<style scoped>
.slideContainer-enter-active {
  animation: slide-in 0.3s ease-in-out forwards;
}
.slideContainer-leave-active {
  animation: slide-out 0.3s ease-in-out forwards;
}

.divLogin {
  background-image: url('../../assets/img/login.jpg');
  background-size: auto;
  background-color: whitesmoke !important;
  min-height: 100vh;
  height: auto;
}

@keyframes slide-in {
  from {
    transform: translateX(-1000px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(1000px);
    opacity: 0;
  }
}
</style>
