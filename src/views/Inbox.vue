<template>
  <div>
    <a-row :gutter="16">
      <a-col :md="24" :lg="8">
        <who-to-follow></who-to-follow>
      </a-col>
      <a-col :md="24" :lg="16">
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
          <button @click="hides =! hides">Toggle</button>
          <transition-group name="slide">
            <inbox-card
              :question="question" 
              v-for="(question, index) in questions" 
              :key="question._id"
              v-if="hide(index)"
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
      hides: true,
    };
  },
  computed: {
    ...mapGetters(['loginUserId'])
  },
  created() {
    this.$store.commit('setSelectedHeaderKey', ['4']);
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
    hide(index) {
      if(index === 2 && this.hides === true) return false 
      else return true
    }
  },
};
</script>
<style scoped>
.spin {
  margin-top: 50px;
  text-align: center;
}

.loading-more {
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
    text-align: center;
}

.no-data {
  text-align: center;
  font-family: monospace;
  margin-top: 15px;
  font-size: larger;
}
/* .slide-right-enter-active-class {
  opacity: 1;
  animation: slide-right 1s linear both;
}

.slide-right-leave-active-class {
  opacity: 1;
  animation: slide-right 1s linear both;
}
.slide-right-leave-class {
  opacity: 0;
  animation: slide-right 1s linear both;
} */

.slide-leave-active {
  /* animation: slide-right 1s linear both; */
  transition: opacity 0.5s;
  opacity: 0;
  position: absolute;
}

.slide-move {
  transition: transform 0.5s;
}

</style>