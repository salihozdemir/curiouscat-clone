<template>
  <a-row type="flex">
    <a-col span="24">
      <!-- <app-user-statics></app-user-statics> -->
      <a-row type="flex" justify="center">
        <a-col :span="4">
          <img
            src="#"
            style="width: 60px; border-radius: 50%; background-color:pink;"
            alt="asdasdas"
          />
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col :span="4">
          <p>Username</p>
          <a-button type="primary">Follow</a-button>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="4">
          <p>Username</p>
        </a-col>
        <a-col :span="4">
          <p>Username</p>
        </a-col>
        <a-col :span="4">
          <p>Username</p>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>
<script>
// import UserStatics from './UserStatics';
export default {
  components: {
    // appUserStatics : UserStatics
  }
};
</script>
<style scoped>
</style>