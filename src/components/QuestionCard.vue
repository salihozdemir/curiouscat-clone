<template>
  <div class="container">
    <div class="card">
      <a-comment>
        <router-link slot="author" :to="fromUserInfo.userUrl" class="author-name">
          {{fromUserInfo.username}}
        </router-link>
        <router-link slot="avatar" :to="fromUserInfo.userUrl">
          <a-avatar
          :src="fromUserInfo.profilePP"
          :alt="fromUserInfo.username"
          :size="40"
          class="comment-avatar" />
        </router-link>
        <p slot="content" class="question-text">{{question.questionText}}</p>
        <span slot="datetime">{{moment(question.timeStamp).fromNow()}}</span>
        <a-comment>
          <router-link 
          slot="author" 
          :to="{name: 'Profile', params: {username: question.toUser.username }}" 
          class="author-name">
            {{question.toUser.username}}
          </router-link>
          <router-link 
          slot="avatar" 
          :to="{name: 'Profile', params: {username: question.toUser.username }}">
            <a-avatar
            :src="toUserInfo"
            :alt="question.toUser.username"
            :size="40"
            class="comment-avatar" />
          </router-link>
          <p slot="content" class="answer-text">{{question.answerText}}</p>
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
          username: 'Anonymous',
          userUrl: '',
          profilePP: '/assets/img/anonymous-pp.png'
        };
      } else {
        const defaultPP = '/assets/img/default-pp.png';
        const backendPP = `${process.env.VUE_APP_API_URL}/${this.question.fromUser._id}/${this.question.fromUser.profileImg}`;
        return {
          username: this.question.fromUser.username,
          userUrl: {name: 'Profile', params: {username: this.question.fromUser.username}},
          profilePP: this.question.fromUser.profileImg === 'default-pp.png' ? defaultPP : backendPP
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
  font-size: 15px;
  color: #32afd3;
  font-weight: 500;
}
.comment-avatar {
  display: inline;
  text-align: center;
}
.question-text{
  color: #414141;
  font-size: 15px;
  line-height: 18px;
  white-space: pre-wrap;
}
.answer-text {
  color: #666;
  font-size: 15px;
  line-height: 18px;
  white-space: pre-wrap;
}
</style>