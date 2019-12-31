<template>
  <a-row :gutter="16">
    <a-col :md="24" :lg="8">
      <app-who-to-follow></app-who-to-follow>
    </a-col>
    <a-col :md="24" :lg="16">
      <app-search></app-search>
      <!-- <app-question-card></app-question-card> -->
    </a-col>
  </a-row>
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue';
import QuestionCard from '@/components/QuestionCard';
import Search from '@/components/Search.vue';

export default {
  components: {
    appWhoToFollow: WhoToFollow,
    appQuestionCard: QuestionCard,
    appSearch: Search
  }
};
</script>
<style scoped>
</style>