<template>
  <div class="container">
    <div class="row">
      <div class="col-4 auth-card">
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
              required
            />
          </div>
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-block btn-success login-button"
            >
              {{ isUser ? 'Login' : 'Signin' }}
            </button>
            <a href="#" @click.prevent="goLoginComponent" class="text-muted"
              >I already have an account</a
            >
          </div>
        </form>
      </div>
      <div class="col-8 align-self-center text-center">
        <h1 class="text-success signup-text-font">
          Join Now!
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../services/index';
// import tools from '../../tools/index';

export default {
  data() {
    return {
      user: {
        email: null,
        username: null,
        password: null
      }
    };
  },
  methods: {
    //Login component ile Signup componentleri arasında geçiş yapabilmeyi sağlar.
    goLoginComponent() {
      this.$store.commit('setActiveComponent', 'app-login');
    },
    async signup() {
      const userToken = await api().post('/user/signup', {
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
.auth-card {
  background-color: #ebf4eb;
  box-shadow: 0 0 10px 1px #343a4052;
  border-radius: 15px;
  padding: 1rem !important;
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

@font-face {
  font-family: signup-text-font;
  src: url('../../assets/font/coaster-quake.otf');
}

.signup-text-font {
  font-family: signup-text-font;
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
