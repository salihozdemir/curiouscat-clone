<template>
  <a-row :gutter="16" type="flex" justify="center">
    <a-col :xs="24" :sm="10" :md="8" :lg="6" :xl="5">
       <who-to-follow></who-to-follow>
    </a-col>
    <a-col :xs="24" :sm="14" :md="12" :lg="10" :xl="9">
      <div v-if="loadingQuestions" class="spin">
          <a-spin size="large"/>
      </div>
      <div 
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="busy" 
        infinite-scroll-distance="limit" 
        infinite-scroll-immediate-check="false">
        <question-card
          v-for="(question) in questions"
          :key="question._id"
          :question="question"
        ></question-card>
          <a-spin v-if="loadingMore" class="loading-more" />
      </div>
    </a-col>
  </a-row>
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue';
import QuestionCard from '@/components/QuestionCard';
import questionService from '@/services/question';
import { mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';

export default {
  components: {
    WhoToFollow,
    QuestionCard,
  },
  directives: { infiniteScroll },
  data(){
    return {
      questions: [],
      loadingQuestions: true,
      loading: false,
      busy: false,
      limit: 5,
      page: 0,
      loadingMore: false,
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
      this.busy = false;
      const result = await questionService.getFollowingQuestions({
        fromUserId: this.loginUserId,
        limit: this.limit,
	      page: this.page
      });
      this.questions = this.questions.concat(result.questions);
      this.$store.commit('setInboxCount', result.inboxCount);
      this.$store.commit('setNotificationCount', result.notificationCount);
      if(result.count < this.limit) this.busy = true;
      this.loadingQuestions = false;
    },
    async loadMore() {
      this.page++;
      if(this.page > 0) this.loadingMore = true;
      await this.getFollowingQuestions();
      this.loadingMore = false;
    }
  }
};
</script>
<style scoped>
.spin {
  margin-top: 50px;
  text-align: center;
}

.loading-more {
  margin: 10px;
  width: 100%;
  text-align: center;
}

</style>