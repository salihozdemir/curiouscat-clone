<template>
  <div>
  <a-row :gutter="16">
    <a-col :md="24" :lg="8">
      <app-who-to-follow></app-who-to-follow>
    </a-col>
    <a-col :md="24" :lg="16">
      <app-inbox-card></app-inbox-card>
    </a-col>
  </a-row>
  </div>  
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue'
import InboxCard from '@/components/InboxCard.vue'
export default {
  components: {
    appWhoToFollow: WhoToFollow,
    appInboxCard: InboxCard
  }
}
</script>
<style scoped>

</style>