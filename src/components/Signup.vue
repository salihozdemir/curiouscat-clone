<template>
  <a-row type="flex" justify="center" style="height: 100vh;" align="middle">
    <a-col>
      <a-card hoverable class="card" headStyle="font-family: site-name-font; font-size:50px;" title="Question">
        <a-form :form="form" @submit.prevent="handleSubmit">
          <a-form-item v-bind="formItemLayout" label="E-mail">
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!'
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="Password">
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!'
                    },
                    {
                      validator: validateToNextPassword
                    }
                  ]
                }
              ]"
              type="password"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="Confirm Password">
            <a-input
              v-decorator="[
                'confirm',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: compareToFirstPassword
                    }
                  ]
                }
              ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label">
              Username&nbsp;
              <a-tooltip title="What do you want others to call you?">
                <a-icon type="question-circle-o" />
              </a-tooltip>
            </span>
            <a-input
              v-decorator="[
                'username',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your username!'
                    }
                  ]
                }
              ]"
            />
          </a-form-item>
          <a-form-item v-bind="tailFormItemLayout"></a-form-item>
          <a-form-item v-bind="tailFormItemLayout">
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              class="signup-form-button"
            >Register</a-button>
            <a href @click.prevent="goLoginComponent">I already have an account</a>
          </a-form-item>
        </a-form>
        <transition v-if="errorMessage">
           <a-alert
            :message="errorMessage"
            type="error"
            banner
          />
        </transition>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import api from '@/services/index';
import common from '@/common/index';
export default {
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 6,
            offset: 0
          },
          sm: {
            span: 12,
            offset: 6
          }
        }
      },
      errorMessage: null,
      loading: false
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit() {
      this.errorMessage = null;
      this.loading = true;
      this.form.validateFieldsAndScroll((err, values) => {
        console.log(values);
        if (!err) {
          api()
            .post('/user/signup', {
              email: values.email,
              username: values.username,
              password: values.password
            })
            .then(result => {
              if (result.data) {
                common.cookie.set('access_token', result.data.token);
                // this.$router.push({ name: 'Profile' });
              } else {
                this.errorMessage = result.response.data.message;
              }
              this.loading = false;
            });
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    goLoginComponent() {
      this.$store.commit('setActiveComponent', 'app-login');
    }
  }
};
</script>
<style scoped>
.signup-form-button {
  width: 100%;
}
.ant-card-hoverable {
  cursor: default;
}
.ant-card-hoverable:hover {
  box-shadow: 0 2px 8px rgba(0, 20, 0, 0.3);
}
.card {
  width: 70vh;
  text-align: center;
  padding: 1.5rem;
  border: 1px solid #1da57a;
}
@font-face {
  font-family: site-name-font;
  src: url('../assets/font/bakeapple.otf');
}
</style>
