<template>
  <a-row :gutter="16">
    <a-col :md="24" :lg="8">
       <who-to-follow></who-to-follow>
    </a-col>
    <a-col :md="24" :lg="16">
      <div v-if="loadingQuestions" class="spin">
          <a-spin size="large"/>
      </div>
      <question-card
        v-else
        v-for="question in questions"
        :key="question._id"
        :question="question"
        >
      </question-card>
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
    WhoToFollow,
    QuestionCard,
  },
  data(){
    return {
      questions: [],
      loadingQuestions: true,
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