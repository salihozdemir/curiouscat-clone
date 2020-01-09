<template>
  <div class="container">
    <div class="card">
      <!-- <a-skeleton v-if="loading" active avatar :paragraph="{rows: 2}" /> -->
      <a-comment>
        <a slot="author" class="author-name">{{getUserInfo.fromUserName}}</a>
        <a-avatar
          slot="avatar"
          :src="getUserInfo.fromUserUrl"
          :alt="getUserInfo.fromUserName"
          :size="40"
          style="text-align: -webkit-center;"
        ></a-avatar>
        <p slot="content">{{question.questionText}}</p>
        <a-comment>
          <a slot="author" class="author-name">{{question.toUser.username}}</a>
          <a-avatar
            slot="avatar"
            :src="question.toUser.profileImg"
            :alt="question.toUser.username"
            :size="40"
            style="text-align: -webkit-center;"
          />
          <p slot="content">{{question.answerText}}</p>
        </a-comment>
      </a-comment>
    </div>
  </div>
</template>
<script>
export default {
  props: ['question', 'loading'],
  computed: {
    getUserInfo() {
      if (this.question.isAnon) {
        return {
          fromUserName: 'Anonymous',
          fromUserUrl: '/assets/img/anonymous-pp.png'
        };
      } else {
        return {
          fromUserName: this.question.fromUser.username,
          fromUserUrl: `https://question-node-api.herokuapp.com/${this.question.fromUser._id}/${this.question.fromUser.profileImg}`
        };
      }
    }
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

.container:last-child {
  margin-bottom: 15px;
}

.author-name {
  font-weight: bold;
  font-size: larger;
}
</style>