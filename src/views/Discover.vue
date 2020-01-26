<template>
  <a-row :gutter="16" type="flex" justify="center">
    <a-col :xs="24" :sm="10" :md="8" :lg="6" :xl="5">
      <who-to-follow></who-to-follow>
    </a-col>
    <a-col :xs="24" :sm="14" :md="12" :lg="10" :xl="9">
      <search></search>
      <question-card
        v-for="question in questions"
        :key="question._id"
        :question="question"
      ></question-card>
    </a-col>
  </a-row>
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue';
import QuestionCard from '@/components/QuestionCard';
import Search from '@/components/Search.vue';
import questionService from '@/services/question';
import { mapGetters } from 'vuex';

export default {
  components: {
    WhoToFollow,
    QuestionCard,
    Search
  },
  data() {
    return {
      questions: [],
      limit: 10
    }
  },
  computed: {
    ...mapGetters(['loginUserId'])
  },
  created() {
    this.$store.commit('setSelectedHeaderKey', ['2']);
    this.getRandomQuestions();
  },
  methods: {
    async getRandomQuestions() {
      const result = await questionService.getRandomQuestions({
        loginUserId: this.loginUserId,
        limit: this.limit,
      });
      this.questions = result.questions;
      this.$store.commit('setInboxCount', result.inboxCount);
      this.$store.commit('setNotificationCount', result.notificationCount);
    }
  }
};
</script>
<style scoped>
</style>