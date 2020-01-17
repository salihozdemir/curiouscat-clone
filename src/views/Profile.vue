<template>
  <div>
    <profile-cover 
      :userImg.sync="userImg" 
      :userName="userName" 
      :userId="userId" 
      :isFollow.sync="isFollow"
      :loading="coverLoading" 
      :answerCount="answerCount">
    </profile-cover>
    <a-row :gutter="16">
      <a-col :md="24" :lg="8">
        <ask-message :userId="userId"></ask-message>
        <who-to-follow></who-to-follow>
      </a-col>
      <a-col :md="24" :lg="16">
        <div v-if="questionLoading" class="spin">
          <a-spin size="large"/>
        </div>
        <p v-if="this.questions.length === 0 && !questionLoading" class="no-data">
          You don't have any asnwered question :(
        </p>
        <div
          v-infinite-scroll="loadMore" 
          infinite-scroll-disabled="busy" 
          infinite-scroll-distance="limit" 
          infinite-scroll-immediate-check="false">
          <question-card
            v-for="question in questions"
            :key="question._id"
            :question="question"
          ></question-card>
          <a-spin v-if="loadingMore" class="loading-more" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import ProfileCover from '@/components/ProfileCover';
import AskMessage from '@/components/AskMessage';
import QuestionCard from '@/components/QuestionCard';
import WhoToFollow from '@/components/WhoToFollow';
import userService from '@/services/user';
import questionService from '@/services/question';
import followService from '@/services/follow';
import { mapGetters } from 'vuex';
import infiniteScroll from 'vue-infinite-scroll';
export default {
  components: {
    ProfileCover,
    AskMessage,
    QuestionCard,
    WhoToFollow
  },
  directives: { infiniteScroll },
  data() {
    return {
      userImg: '',
      userName: '',
      userId: '',
      answerCount: 0,
      user: {},
      questions: [],
      questionLoading: true,
      coverLoading: true,
      isFollow: '',
      busy: false,
      limit: 5,
      page: 0,
      loadingMore: false,
    };
  },
  computed: {
    ...mapGetters(['loginUserId'])
  },
  async created() {
    this.questionLoading = true;
    this.coverLoading = true;
    await this.getUser();
    this.isFollowUser();
    this.getAnsweredQuestions();
  },
  methods: {
    async getUser() {
      const details = await userService.getUserDetail(
        this.$route.params.username
      );
      if(!details) {
        this.$router.push({
          name: 'Discover',
        });
        this.$message.error('User not found');
      };
      this.userImg = details.profileImg;
      this.userName = details.username;
      this.userId = details.id;
      this.answerCount = details.answerCount;
    },
    async getAnsweredQuestions() {
      const result = await questionService.getUserQuestions({
        toUserId: this.userId,
        answered: true,
        limit: this.limit,
        page: this.page,
      });
      this.questions = this.questions.concat(result.questions);
      if(result.questions.length < this.limit) this.busy = true;
      this.questionLoading = false;
    },
    async loadMore() {
      this.page++;
      if(this.page > 0) this.loadingMore = true;
      await this.getAnsweredQuestions();
      this.loadingMore = false;
    },
    async isFollowUser() {
      const result = await followService.isFollow({
        toUserId: this.userId,
        fromUserId: this.loginUserId
      });
      this.isFollow = result.isFollow;
      this.coverLoading = false;
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
</style>
