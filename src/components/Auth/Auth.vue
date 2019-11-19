<template>
  <div class="container">
    <div class="row" style="margin-top: 130px">
      <div
        class="col-sm-4 p-3 border"
        :class="{ 'border-primary': isUser, 'border-success': !isUser }"
      >
        <h3
          :class="{ 'text-primary': isUser, 'text-success': !isUser }"
          class="text-center mb-3 mt-3"
        >
          Question Anonymous
        </h3>
        <hr />
        <form>
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              class="form-control"
              placeholder="Email address"
              required
            />
          </div>
          <div class="form-group">
            <label>Username</label>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div class="text-center">
            <button
              type="submit"
              :class="{ 'btn-primary': isUser, 'btn-success': !isUser }"
              class="btn btn-block mb-2"
              @click.prevent="onSubmit"
            >
              {{ isUser ? 'Login' : 'Signin' }}
            </button>
            <a href="#" @click.prevent="isUser = !isUser" class="text-muted">{{
              isUser ? 'Signup' : 'I already have an account'
            }}</a>
          </div>
        </form>
      </div>
      <div class="col-sm-8 text-center align-self-center">
        <h1 :class="{ 'text-primary': isUser, 'text-success': !isUser }">
          {{ isUser ? 'Login' : 'Join Now!' }}
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../services/index';

export default {
  data() {
    return {
      isUser: false
    };
  },
  methods: {
    async onSubmit() {
      const data = await api().post('/user/login', {
        email: '123@123.com',
        password: '123123'
      });
      console.log(data);
    }
  }
};
</script>

<style scoped></style>
