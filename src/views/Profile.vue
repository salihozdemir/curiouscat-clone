<template>
  <div>
    <a-skeleton v-if="coverLoading" active :paragraph="{rows: 6}" />
    <app-profile-cover v-else :userImg.sync="userImg" :userName="userName" :userId="userId" :isFollow.sync="isFollow"></app-profile-cover>
    <a-row :gutter="16">
      <a-col :md="24" :lg="8">
        <app-ask-message :userId="userId"></app-ask-message>
        <app-who-to-follow></app-who-to-follow>
      </a-col>
      <a-col :md="24" :lg="16">
        <!-- <div v-if="questionLoading">
          <div class="card" v-for="i in 4" :key="i">
            <a-skeleton active avatar :paragraph="{rows: 2}" />
          </div>
        </div> -->
        <app-question-card
          v-for="question in questions"
          :key="question._id"
          :question="question"
          :loading="questionLoading"
        ></app-question-card>
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
export default {
  components: {
    appProfileCover: ProfileCover,
    appAskMessage: AskMessage,
    appQuestionCard: QuestionCard,
    appWhoToFollow: WhoToFollow
  },
  data() {
    return {
      userImg: '',
      userName: '',
      userId: '',
      questions: [],
      questionLoading: true,
      coverLoading: true,
      isFollow: '',
    };
  },
  computed: {
     ...mapGetters(['loginUserId']),
  },
  methods: {
    async getUser() {
      const details = await userService.getUserDetail(
        this.$route.params.username
      );
      this.userImg = details.profileImg;
      this.userName = details.username;
      this.userId = details.id;
    },
    async getAnsweredQuestions() {
      const result = await questionService.getNonAnsweredQuestions({
        toUserId: this.userId,
        answered: true
      });
      this.questions = result.questions;
      this.questionLoading = false;
    },
    async isFollowUser() {
      const result = await followService.isFollow({
        toUserId: this.userId,
        fromUserId: this.loginUserId
      });
      console.log('result isFollow: ',result.isFollow)
      this.isFollow = result.isFollow;
      this.coverLoading = false;
    }
  },
  async created() {
    this.questionLoading = true;
    this.coverLoading = true;
    await this.getUser();
    await this.getAnsweredQuestions();
    await this.isFollowUser();
  }
};
</script>
<style scoped>
.card {
  padding: 10px;
  background-color: white;
  margin-top: 10px;
  border-radius: 0.5rem;
}
</style>
