<template>
  <div class="container">
    <div class="card">
      <a-comment>
        <router-link slot="author" :to="{name: 'Profile', params: {username: fromUserInfo.fromUserName }}" replace class="author-name">
          {{fromUserInfo.fromUserName}}
        </router-link>
        <router-link slot="avatar" :to="'../Profile/' + fromUserInfo.fromUserName">
          <a-avatar
          :src="fromUserInfo.fromUserUrl"
          :alt="fromUserInfo.fromUserName"
          :size="40"
          class="comment-avatar" />
        </router-link>
        <p slot="content">{{question.questionText}}</p>
        <span slot="datetime">{{moment(question.timeStamp).fromNow()}}</span>
        <a-comment>
          <router-link slot="author" :to="'../Profile/' + question.toUser.username" class="author-name">
            {{question.toUser.username}}
          </router-link>
          <router-link slot="avatar" :to="'../Profile/' + question.toUser.username">
            <a-avatar
            :src="toUserInfo"
            :alt="question.toUser.username"
            :size="40"
            class="comment-avatar" />
          </router-link>
          <p slot="content">{{question.answerText}}</p>
        </a-comment>
      </a-comment>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  props: ['question'],
  data(){
    return {
      moment,
    }
  },
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
  margin-bottom: 55px;
}

.author-name {
  font-size: 14px;
  color: #32afd3;
  font-weight: 500;
}

.comment-avatar {
  display: inline;
  text-align: center;
}


</style>