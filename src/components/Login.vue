<template>
  <a-row type="flex" justify="space-around" style="height: 100vh;" align="middle">
    <a-col>
      <a-card hoverable class="card" title="Question">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit.prevent="login"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    { required: true, message: 'Please input your email!' }
                  ]
                }
              ]"
              placeholder="Email"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    { required: true, message: 'Please input your Password!' }
                  ]
                }
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
              :loading="loading"
            >Log in</a-button>Or
            <a href @click.prevent="goSignupComponent">register now!</a>
          </a-form-item>
        </a-form>
        <transition v-if="errorMessage">
          <a-alert :message="errorMessage" type="error" banner />
        </transition>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import api from '@/services/index';
import common from '@/common/index';
import jwt from 'jsonwebtoken';

export default {
  data() {
    return {
      errorMessage: null,
      loading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    login() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          this.errorMessage = null;
          const login = api()
            .post('/user/login', {
              email: values.email,
              password: values.password
            })
            .then(result => {
              if (result.data) {
                common.cookie.set('access_token', result.data.token);
                const decoded = jwt.verify(result.data.token, process.env.MONGO_KEY);
                this.$store.commit('setLoginUserId', decoded.userId);
                this.$store.commit('setloginUserName', decoded.username);
                this.$store.commit('setToken', result.data.token);
                this.$router.push({ name: 'Home' });
              } else {
                this.errorMessage = result.response.data.message;
              }
              this.loading = false;
            });
        }
      });
    },
    goSignupComponent() {
      this.$store.commit('setActiveComponent', 'signup');
    }
  }
};
</script>

<style scoped>
.login-form-button {
  width: 100%;
}
.ant-card-hoverable:hover {
  box-shadow: 0 2px 8px rgba(0, 20, 0, 0.3);
}
.ant-card-hoverable {
  cursor: default;
}
.card {
  width: 350px;
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #1da57a;
}
</style>
