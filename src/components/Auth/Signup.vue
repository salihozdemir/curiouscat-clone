<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4">
        <div class="auth-card">
          <h3 class="site-name">
            Question
          </h3>
          <hr />
          <form @submit.prevent="signup">
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
              <label class="label-text">Username</label>
              <input
                v-model="user.username"
                type="text"
                class="form-control input-text"
                placeholder="Username"
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
                class="btn btn-block btn-success login-button ld-ext-right"
                :class="{ running: loading }"
              >
                Sign Up
                <div class="ld ld-ring ld-spin"></div>
              </button>
              <a href="#" @click.prevent="goLoginComponent" class="text-muted"
                >I already have an account</a
              >
            </div>
          </form>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </div>
      </div>
      <div class="col-sm-8 align-self-center text-center">
        <h1 class="text-success signup-text-font">
          Join Now!
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../services/index';
import tools from '../../tools/index';

// Button basıldığında spinner gözükmesi için bu kütüphane kullanıldı.
import 'ldbutton/dist/ldbtn.min.css';

export default {
  data() {
    return {
      user: {
        email: null,
        username: null,
        password: null
      },
      errorMessage: null,
      loading: false
    };
  },
  methods: {
    //Login component ile Signup componentleri arasında geçiş yapabilmeyi sağlar.
    goLoginComponent() {
      this.$store.commit('setActiveComponent', 'app-login');
    },
    async signup() {
      //Ard arda login tuşuna tıklandığında hatanın sıfırdan gelmesini sağlar.
      this.errorMessage = null;
      this.loading = true;
      const userToken = await api().post('/user/signup', {
        email: this.user.email,
        username: this.user.username,
        password: this.user.password
      });
      //Servisten dönen cevap 200 ise cookies'e tokenı yaz. Değilse hata mesajını tut ve ekranda göster.
      if (userToken.data) {
        tools.cookie.set('access_token', userToken.data.token);
        this.$router.push({ name: 'Profile' });
      } else {
        this.errorMessage = userToken.response.data.message;
      }
      this.loading = false;
    }
  }
};
</script>
<style scoped>
.auth-card {
  background-color: #ebf4eb;
  box-shadow: 0 0 10px 1px #343a4052;
  border-radius: 15px;
  padding: 1rem !important;
  margin-top: 1rem;
  border: 1px solid #dee2e6 !important;
}

.input-text {
  border-radius: 10px !important;
}

.input-text:focus {
  box-shadow: 0 0 0 0.2rem #c3e8d294;
  border: 0.1px;
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
  font-family: signup-text-font;
  src: url('../../assets/font/coaster-quake.otf');
}

.signup-text-font {
  font-family: signup-text-font;
  font-size: 195px;
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
