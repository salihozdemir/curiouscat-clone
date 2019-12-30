<template>
  <div>
    <app-profile-cover :userImg.sync="userImg" :userName="userName" :userId="userId"></app-profile-cover>
    <a-row :gutter="16">
      <a-col :md="24" :lg="8">
        <app-ask-message :userId="userId"></app-ask-message>
        <app-who-to-follow></app-who-to-follow>
      </a-col>
      <a-col :md="24" :lg="16">
        <app-question-card></app-question-card>
        <app-question-card></app-question-card>
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
export default {
  data(){
    return {
      userImg: '',
      userName: '',
      userId: '',
    }
  },
  components: {
    appProfileCover: ProfileCover,
    appAskMessage: AskMessage,
    appQuestionCard: QuestionCard,
    appWhoToFollow: WhoToFollow
  },
  methods: {
    async getUser() {
      const details = await userService.getUserDetail(this.$route.params.username);
      console.log(details);
      this.userImg = details.profileImg;
      this.userName = details.username;
      this.userId = details.id;
    },
  },
  created() {
  this.getUser();
  }
};
</script>
<style scoped></style>
