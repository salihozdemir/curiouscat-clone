<template>
  <a-row :gutter="16" type="flex" justify="center">
    <a-col :xs="24" :sm="10" :md="8" :lg="6" :xl="5">
      <who-to-follow></who-to-follow>
    </a-col>
    <a-col :xs="24" :sm="14" :md="12" :lg="10" :xl="9">
      <div v-if="notificationLoading" class="spin">
          <a-spin size="large"/>
      </div>
      <p v-if="this.notifications.length === 0 && !notificationLoading" class="no-data">
          You don't have any notification :(
      </p>
      <div
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="busy" 
        infinite-scroll-distance="limit" 
        infinite-scroll-immediate-check="false">
        <transition-group name="notification">
          <notification-card 
            v-for="(notification, index) in notifications" 
            :key="notification._id"
            :notification="notification"
            @delete-notification="deleteNotification(index)"> 
          </notification-card>
        </transition-group>
        <a-spin v-if="loadingMore" class="loading-more" />
      </div>
    </a-col>
  </a-row>
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue';
import NotificationCard from '@/components/NotificationCard.vue';
import notificationService from '@/services/notification';
import { mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';

export default {
  components: {
    WhoToFollow,
    NotificationCard,
  },
  directives: { infiniteScroll },
  data(){
    return {
      notifications : [],
      notificationLoading: true,
      busy: false,
      limit: 15,
      page: 0,
      loadingMore: false
    }
  },
  computed: {
    ...mapGetters(['loginUserId'])
  },
   created() {
     this.$store.commit('setSelectedHeaderKey', ['5']);
    this.getUserNotifications();
  },
  methods: {
    async getUserNotifications() {
      const result = await notificationService.getNotifications({
        loginUserId: this.loginUserId,
        page: this.page,
        limit: this.limit
      });
      this.notifications = result.notifications;
      this.$store.commit('setInboxCount', result.inboxCount);
      this.$store.commit('setNotificationCount', 0);
      if(result.notifications.length < this.limit) this.busy = true;
      this.notificationLoading = false;
    },
    async loadMore() {
      this.page++;
      if(this.page > 0) this.loadingMore = true;
      await this.getUserNotifications();
      this.loadingMore = false;
    },
    deleteNotification(index) {
      this.notifications.splice(index, 1);
    }
  }
}
</script>
<style scoped>
.spin {
  margin-top: 50px;
  text-align: center;
}

.loading-more {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

.no-data {
  text-align: center;
  font-family: monospace;
  margin-top: 15px;
  font-size: larger;
}

.notification-leave-active {
  transition: opacity;
  opacity: 0;
  position: absolute;
}

.notification-move {
  transition: transform 0.8s;
}
</style>