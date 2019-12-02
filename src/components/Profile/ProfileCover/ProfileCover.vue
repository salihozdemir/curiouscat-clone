<template>
  <div class="panel-profile">
    <div class="panel-heading"></div>
    <div class="row">
      <div class="col-sm-4 align-self-center">
        <app-user-statistics></app-user-statistics>
      </div>
      <div class="col-sm-4 text-center">
        <img class="panel-profile-img" @click="$refs.file.click()" alt="err" />
        <!-- <input
          ref="file"
          type="file"
          @change="onChange($event)"
          class="form-control"
          v-if="isOwnProfile"
        /> -->
        <h4>
          <strong>UserName</strong>
        </h4>
        <button type="button" class="btn btn-sm btn-outline-primary mb-2">
          follow/unfollow
        </button>
      </div>
      <div class="col-sm-4">
        <div class="row justify-content-sm-center pt-4">
          <button
            type="button"
            @click="$refs.file.click()"
            class="btn btn-sm btn-outline-success border-0"
          >
            Edit Photo
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger border-0 mr-5"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UsersStatistics from '../ProfileCover/UsersStatistics';
export default {
  components: {
    appUserStatistics: UsersStatistics
  }
};
</script>
<style scoped></style>
