<template>
  <a-row :gutter="16">
    <a-col :md="24" :lg="8">
      <app-who-to-follow></app-who-to-follow>
    </a-col>
    <a-col :md="24" :lg="16">
      <app-notification-card></app-notification-card>
      <app-notification-card></app-notification-card>
      <app-notification-card></app-notification-card>
      <app-notification-card></app-notification-card>
    </a-col>
  </a-row>
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue';
import NotificationCard from '@/components/NotificationCard.vue';

export default {
  components: {
    appWhoToFollow: WhoToFollow,
    appNotificationCard: NotificationCard,
  }
}
</script>
<style scoped>

</style>