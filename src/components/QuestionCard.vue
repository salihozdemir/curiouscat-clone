<template>
  <div class="container">
    <div class="card">
      <a-skeleton :loading="false" active>
        <a-comment>
          <a slot="author" @click="goToProfile(fromUserInfo.fromUserName)" class="author-name">
            {{fromUserInfo.fromUserName}}
          </a>
          <a-avatar
            @click="goToProfile(fromUserInfo.fromUserName)"
            slot="avatar"
            :src="fromUserInfo.fromUserUrl"
            :alt="fromUserInfo.fromUserName"
            :size="40"
            class="comment-avatar"
          ></a-avatar>
          <p slot="content">{{question.questionText}}</p>
          <a-comment>
            <a slot="author" @click="goToProfile(question.toUser.username)" class="author-name">{{question.toUser.username}}</a>
            <a-avatar
              @click="goToProfile(question.toUser.username)"
              slot="avatar"
              :src="toUserInfo"
              :alt="question.toUser.username"
              :size="40"
              class="comment-avatar"
            />
            <p slot="content">{{question.answerText}}</p>
          </a-comment>
        </a-comment>
      </a-skeleton>
    </div>
  </div>
</template>
<script>
export default {
  props: ['question'],
  computed: {
    fromUserInfo() {
      if (this.question.isAnon) {
        return {
          fromUserName: 'Anonymous',
          fromUserUrl: '/assets/img/anonymous-pp.png'
        };
      } else {
        const defaultPP = '/assets/img/default-pp.png';
        const backendPP = `${process.env.VUE_APP_API_URL}/${this.question.fromUser._id}/${this.question.fromUser.profileImg}`;
        return {
          fromUserName: this.question.fromUser.username,
          fromUserUrl: this.question.fromUser.profileImg === 'default-pp.png' ? defaultPP : backendPP
        }; 
      }
    },
    toUserInfo() {
      const defaultPP = '/assets/img/default-pp.png';
      const backendPP = `${process.env.VUE_APP_API_URL}/${this.question.toUser._id}/${this.question.toUser.profileImg}`;
      return this.question.toUser.profileImg === 'default-pp.png' ? defaultPP : backendPP
    },
  },
  methods: {
    goToProfile(value) {
      if(value !== 'Anonymous'){
        this.$router.push({
          name: 'Profile',
          params: { username: value }
        }); 
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
  box-shadow: 0 0px 4px 0 rgba(0,0,0,0.2);
}

.container:last-child {
  margin-bottom: 15px;
}

.author-name {
  font-size: 14px;
  color: #32afd3;
}

.comment-avatar {
  display: inline;
  text-align: center;
}


</style>