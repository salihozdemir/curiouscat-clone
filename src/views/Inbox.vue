<template>
  <div>
    <a-row :gutter="16" justify="center" type="flex">
      <a-col :xs="24" :sm="10" :md="8" :lg="6" :xl="5">
        <who-to-follow></who-to-follow>
      </a-col>
      <a-col :xs="24" :sm="14" :md="12" :lg="10" :xl="9">
        <div v-if="questionLoading" class="spin">
          <a-spin size="large"/>
        </div>
        <p v-if="this.questions.length === 0 && !questionLoading" class="no-data">
          You don't have any question :(
        </p>
        <div
          v-infinite-scroll="loadMore" 
          infinite-scroll-disabled="busy" 
          infinite-scroll-distance="limit" 
          infinite-scroll-immediate-check="false">
          <transition-group name="question">
            <inbox-card
              :question="question" 
              v-for="(question, index) in questions" 
              :key="question._id"
              @delete-card="deleteQuestion(index)">
            </inbox-card>
          </transition-group>
          <a-spin v-if="loadingMore" class="loading-more" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import WhoToFollow from '@/components/WhoToFollow.vue';
import InboxCard from '@/components/InboxCard.vue';
import questionService from '@/services/question';
import { mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';

export default {
  components: {
    WhoToFollow,
    InboxCard
  },
  directives: { infiniteScroll },
  data() {
    return {
      questions: [],
      questionLoading: true,
      busy: false,
      limit: 10,
      page: 0,
      loadingMore: false,
    };
  },
  computed: {
    ...mapGetters(['loginUserId'])
  },
  created() {
    this.getNonAnsweredQuestions();
  },
  methods: {
    async getNonAnsweredQuestions() {
      const result = await questionService.getUserQuestions({
        toUserId: this.loginUserId,
        answered: false,
        limit: this.limit,
        page: this.page,
        loginUserId: this.loginUserId
      });
      this.questions = this.questions.concat(result.questions);
      this.$store.commit('setInboxCount', result.inboxCount);
      this.$store.commit('setNotificationCount', result.notificationCount);
      if(result.questions.length < this.limit) this.busy = true;
      this.questionLoading = false;
    },
    async loadMore() {
      this.page++;
      if(this.page > 0) this.loadingMore = true;
      await this.getNonAnsweredQuestions();
      this.loadingMore = false;
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.spin {
  margin-top: 50px;
  text-align: center;
}

.loading-more {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

.no-data {
  text-align: center;
  font-family: monospace;
  margin-top: 15px;
  font-size: larger;
}

.question-leave-active {
  transition: opacity;
  opacity: 0;
  position: absolute;
}

.question-move {
  transition: transform 0.8s;
}

</style>