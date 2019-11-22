<template>
  <div class="container">
    <div class="row">
      <div class="col-4 auth-card">
        <h3 class="site-name">
          Question
        </h3>
        <hr />
        <form @submit.prevent="login">
          <div class="form-group">
            <label class="label-text">Email</label>
            <input
              v-model="user.email"
              type="email"
              class="form-control input-text"
              placeholder="Email address"
              autocomplete="off"
              required
            />
          </div>
          <div class="form-group">
            <label class="label-text">Password</label>
            <input
              v-model="user.password"
              type="password"
              class="form-control input-text"
              placeholder="Password"
              autocomplete="off"
              required
            />
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-block btn-primary login-button"
            >
              Login
            </button>
            <a href="#" @click.prevent="goSignupComponent" class="text-muted"
              >I don't have an account</a
            >
          </div>
        </form>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
      <div class="col-8 text-center align-self-center">
        <h1 class="text-primary login-text-font">
          Login
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../services/index';
import tools from '../../tools/index';
//TODO: Loading componenti kullanıcı giriş yaptığında çalışsın.
export default {
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      errorMessage: null,
      loading: false
    };
  },
  methods: {
    //Login component ile Signup componentleri arasında geçiş yapabilmeyi sağlar.
    goSignupComponent() {
      this.$store.commit('setActiveComponent', 'app-signup');
    },
    async login() {
      //Ard arda login tuşuna tıklandığında hatanın sıfırdan gelmesini sağlar.
      this.errorMessage = null;
      const userToken = await api().post('/user/login', {
        email: this.user.email,
        password: this.user.password
      });
      //Servisten dönen cevap 200 ise cookies'e tokenı yaz. Değilse hata mesajını tut ve ekranda göster.
      if (userToken.data) {
        tools.cookie.set('access_token', userToken.data.token);
        this.$router.push({ name: 'Profile' });
      } else {
        this.errorMessage = userToken.response.data.message;
      }
    }
  }
};
</script>
<style scoped>
.auth-card {
  background-color: #eaecf2;
  box-shadow: 0 0 10px 1px #343a4052;
  border-radius: 15px;
  padding: 1rem !important;
  border: 1px solid #dee2e6 !important;
}

.input-text {
  border-radius: 10px !important;
}

.label-text {
  margin-left: 5px;
}

.login-button {
  border-radius: 10px;
  margin-bottom: 0.5rem !important;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
  font-family: cursive;
  font-weight: bolder;
}

@font-face {
  font-family: login-text-font;
  src: url('../../assets/font/coaster-quake.otf');
}

.login-text-font {
  font-family: login-text-font;
  font-size: 200px;
}

@font-face {
  font-family: site-name;
  src: url('../../assets/font/bakeapple.otf');
}

.site-name {
  font-family: site-name;
  color: #727273;
  font-size: 55px;
  text-align: center !important;
}
</style>
