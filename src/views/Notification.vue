<template>
  <a-row :gutter="16">
    <a-col :md="24" :lg="8">
      <who-to-follow></who-to-follow>
    </a-col>
    <a-col :md="24" :lg="16">
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
        <notification-card 
          v-for="notification in notifications" 
          :key="notification._id"
          :notification="notification"> 
        </notification-card>
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
     this.$store.commit('setSelectedHeaderKey', '5');
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
  }
}
</script>
<style scoped>
.spin {
  margin-top: 50px;
  text-align: center;
}

.loading-more {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
    text-align: center;
}

.no-data {
  text-align: center;
  font-family: monospace;
  margin-top: 15px;
  font-size: larger;
}
</style>