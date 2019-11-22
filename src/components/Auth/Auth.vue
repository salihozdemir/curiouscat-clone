<template>
  <div class="auth-background vertical-center">
    <transition name="slideContainer" mode="out-in" appear>
      <component :is="getActiveComponent" key="authComponent"></component>
    </transition>
  </div>
</template>
<script>
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import { mapGetters } from 'vuex';

export default {
  components: {
    appLogin: Login,
    appSignup: Signup
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getActiveComponent'])
  },
  //TODO: Kullanıcı email veya username ile giriş yapabilsin.
  methods: {}
};
</script>

<style scoped>
.slideContainer-enter-active {
  animation: slide-in 0.3s ease-in-out forwards;
}
.slideContainer-leave-active {
  animation: slide-out 0.3s ease-in-out forwards;
}

.auth-background {
  background-image: url('../../assets/img/login.jpg');
  background-size: auto;
  background-color: whitesmoke !important;
  min-height: 100vh;
  height: auto;
}

.vertical-center {
  min-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
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
