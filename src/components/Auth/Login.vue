<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4 p-3 border border-primary">
        <h3 class="text-center text-primary mb-3 mt-3">
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
            <button type="submit" class="btn btn-block btn-primary mb-2">
              Signup
            </button>
            <a href="#" @click.prevent="goSignup" class="text-muted">Login</a>
          </div>
        </form>
      </div>
      <div class="col-sm-8 text-center align-self-center">
        <h1 class="text-primary">
          Login
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
        password: null,
        email: null
      }
    };
  },
  methods: {
    goSignup() {
      this.$store.commit('setActiveComponent', 'app-signup');
    }
  }
};
</script>
<style scoped>
.container {
    min-height: 100vh;
  height: auto;
}
</style>
