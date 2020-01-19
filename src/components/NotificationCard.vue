<template>
  <div class="card" id="notification-card">
    <a-comment>
      <a-avatar
        @click="goToProfile(notification.fromUser.username)"
        slot="avatar"
        :src="getProfileImg(notification.fromUser)"
        :size="40"
        class="avatar"
      ></a-avatar>
      <p slot="content" :style="notification.isViewed ? '' : 'font-weight: 500'">
        <a :href="'./Profile/' + notification.fromUser.username">{{notification.fromUser.username}}</a> 
        {{notification.notificationText}}
      </p>
      <span slot="datetime">{{moment(notification.timeStamp).fromNow()}}</span>
      <a-popconfirm
          title="Are you sure delete this notification?"
          @confirm="deleteNotification"
          okText="Yes"
          cancelText="No"
        >
          <a-icon slot="icon" type="delete" style="color: red" />
          <a-icon type="close" class="delete-button"/>
        </a-popconfirm>
    </a-comment>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  props: ['notification'],
  data(){
    return {
      moment
    }
  },
  methods: {
    getProfileImg(user) {
      const defaultPP = '/assets/img/default-pp.png';
      const backendPP = `${process.env.VUE_APP_API_URL}/${user._id}/${user.profileImg}`;
      return user.profileImg === 'default-pp.png' ? defaultPP : backendPP
    },
    goToProfile(value) {
      this.$router.push({
        name: 'Profile',
        params: { username: value }
      }); 
    },
    deleteNotification() {

    }
  }
};
</script>
<style scoped>
.card {
  padding: 10px;
  background-color: white;
  margin-top: 10px;
  border-radius: 0.5rem;
  box-shadow: 0 0px 4px 0 rgba(0,0,0,0.2);
}

.author-name {
  font-size: 14px;
  color: #32afd3;
}

.avatar {
  display: inline;
  text-align: center;
  cursor: pointer;
}

.delete-button {
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  color: #8a8989;
}
</style>