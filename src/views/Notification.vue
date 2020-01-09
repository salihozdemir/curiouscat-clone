<template>
  <a-row :gutter="16">
    <a-col :md="24" :lg="8">
      <who-to-follow></who-to-follow>
    </a-col>
    <a-col :md="24" :lg="16">
      <notification-card></notification-card>
      <notification-card></notification-card>
      <notification-card></notification-card>
      <notification-card></notification-card>
    </a-col>
  </a-row>
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue';
import NotificationCard from '@/components/NotificationCard.vue';

export default {
  components: {
    WhoToFollow,
    NotificationCard,
  }
}
</script>
<style scoped>

</style>