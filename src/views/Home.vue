<template>
  <a-row :gutter="16">
    <a-col :md="24" :lg="8">
       <app-who-to-follow></app-who-to-follow>
    </a-col>
    <a-col :md="24" :lg="16">
      <app-question-card
          v-for="question in questions"
          :key="question._id"
          :question="question"
        ></app-question-card>
    </a-col>
  </a-row>
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue';
import QuestionCard from '@/components/QuestionCard';
import questionService from '@/services/question';
import { mapGetters } from 'vuex';

export default {
  components: {
    appWhoToFollow: WhoToFollow,
    appQuestionCard: QuestionCard,
  },
  data(){
    return {
      questions: [],
    }
  },
  computed: {
     ...mapGetters(['loginUserId']),
  },
  created() {
    this.getFollowingQuestions();
  },
  methods: {
    async getFollowingQuestions(){
      const result = await questionService.getFollowingQuestions(this.loginUserId);
      this.questions = result.questions;
    }
  }
};
</script>
<style scoped>
</style>