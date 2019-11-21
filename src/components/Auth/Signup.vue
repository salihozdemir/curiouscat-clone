<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4 p-3 border border-success">
        <h3 class="text-center text-success mb-3 mt-3">
          Question
        </h3>
        <hr />
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>Email</label>
            <input
              v-model="user.email"
              type="email"
              class="form-control"
              placeholder="Email address"
              required
            />
          </div>
          <div class="form-group">
            <label>Username</label>
            <input
              v-model="user.username"
              type="text"
              class="form-control"
              placeholder="Username"
              required
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-block btn-success mb-2">
              {{ isUser ? 'Login' : 'Signin' }}
            </button>
            <a href="#" @click.prevent="goLogin" class="text-muted"
              >I already have an account</a
            >
          </div>
        </form>
      </div>
      <div class="col-sm-8 align-self-center text-center">
        <h1 class="text-success">
          Join Now!
        </h1>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: null,
        password: null,
        email: null
      }
    };
  },
  methods: {
    goLogin() {
      this.$store.commit('setActiveComponent', 'app-login');
    }
  }
};
</script>
<style scoped></style>
