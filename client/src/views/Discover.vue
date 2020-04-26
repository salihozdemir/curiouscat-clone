<template>
  <a-row :gutter="16" type="flex" justify="center">
    <a-col :xs="24" :sm="10" :md="8" :lg="6" :xl="5">
      <who-to-follow></who-to-follow>
    </a-col>
    <a-col :xs="24" :sm="14" :md="12" :lg="10" :xl="9">
      <search></search>
      <div v-if="loadingQuestions" class="spin">
          <a-spin size="large"/>
      </div>
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
      limit: 10,
      loadingQuestions: true,
    }
  },
  computed: {
    ...mapGetters(['loginUserId'])
  },
  created() {
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
      this.loadingQuestions = false;
    }
  }
};
</script>
<style scoped>
.spin {
  margin-top: 50px;
  text-align: center;
}
</style>