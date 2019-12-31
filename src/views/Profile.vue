<template>
  <div>
    <app-profile-cover :userImg.sync="userImg" :userName="userName" :userId="userId"></app-profile-cover>
    <a-row :gutter="16">
      <a-col :md="24" :lg="8">
        <app-ask-message :userId="userId"></app-ask-message>
        <app-who-to-follow></app-who-to-follow>
      </a-col>
      <a-col :md="24" :lg="16">
        <app-question-card v-for="question in questions" :key="question._id" :question="question"></app-question-card>
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
export default {
  data() {
    return {
      userImg: 'default-pp.png',
      userName: '',
      userId: '',
      questions: []
    };
  },
  components: {
    appProfileCover: ProfileCover,
    appAskMessage: AskMessage,
    appQuestionCard: QuestionCard,
    appWhoToFollow: WhoToFollow
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
    }
  },
  async created() {
    await this.getUser();
    await this.getAnsweredQuestions();
  }
};
</script>
<style scoped></style>
