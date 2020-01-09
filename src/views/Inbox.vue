<template>
  <div>
    <a-row :gutter="16">
      <a-col :md="24" :lg="8">
        <who-to-follow></who-to-follow>
      </a-col>
      <a-col :md="24" :lg="16">
        <inbox-card :question="question" v-for="question in questions" :key="question._id"></inbox-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue';
import InboxCard from '@/components/InboxCard.vue';
import questionService from '@/services/question';
import { mapGetters } from 'vuex';
export default {
  components: {
    WhoToFollow,
    InboxCard
  },
  data() {
    return {
      questions: []
    };
  },
  computed: {
    ...mapGetters(['loginUserId'])
  },
  methods: {
    async getNonAnsweredQuestions() {
      const result = await questionService.getNonAnsweredQuestions({
        toUserId: this.loginUserId,
        answered: false
      });
      this.questions = result.questions;
      console.log('getNonAnsweredQuestions', result);
    }
  },
  created() {
    this.getNonAnsweredQuestions();
  }
};
</script>
<style scoped>
</style>