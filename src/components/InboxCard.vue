<template>
  <div class="card" id="inbox-card">
    <a-comment>
      <router-link slot="author" class="author-name" :to="'../Profile/' + fromUserInfo.name">
        {{fromUserInfo.name}}
      </router-link>
      <router-link slot="avatar" :to="'../Profile/' + fromUserInfo.name">
        <a-avatar
        :src="fromUserInfo.url"
        :alt="fromUserInfo.name"
        :size="40"
        class="avatar" />
      </router-link>
      <p slot="content" style="margin-bottom: 25px;">{{question.questionText}}</p>
      <span slot="datetime">{{moment(question.timeStamp).fromNow()}}</span>
      <a-popconfirm
          title="Are you sure delete this question?"
          @confirm="deleteQuestion"
          okText="Yes"
          cancelText="No"
        >
          <a-icon slot="icon" type="delete" style="color: red" />
          <a-icon type="close" class="delete-button"/>
        </a-popconfirm>
        <a-button shape="round" size="small" @click="showModal" class="reply-button">
          Answer
          <a-icon type="right" style="font-size: 13px;" />
        </a-button>
    </a-comment>
    <a-modal
      :visible="visible"
      @ok="answerQuestion"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      okText="Answer"
      :closable="false"
      >
      <div class="question-container">
        <div class="sender">
          <router-link :to="'../Profile/' + fromUserInfo.name"> {{fromUserInfo.name}} </router-link> asked
        </div>
        <span>{{question.questionText}}</span>
      </div>
      <a-textarea
        style="padding: 10px;"
        v-model="answerText"
        placeholder="Ask something!"
        :autosize="{ minRows: 6, maxRows: 12 }"
        :centered="true"
      />
    </a-modal>
  </div>
</template> 
<script>
import moment from 'moment';
import questionService from '@/services/question';
import { mapGetters } from 'vuex';
export default {
  props: ['question'],
  data() {
    return {
      visible: false,
      confirmLoading: false,
      answerText: '',
      moment
    };
  },
  computed: {
    ...mapGetters(['loginUserId']),
    fromUserInfo() {
      if (this.question.isAnon) {
        return {
          name: 'Anonymous',
          url: '/assets/img/anonymous-pp.png'
        };
     } else {
        const defaultPP = '/assets/img/default-pp.png';
        const backendPP = `${process.env.VUE_APP_API_URL}/${this.question.fromUser._id}/${this.question.fromUser.profileImg}`;
        return {
          name: this.question.fromUser.username,
          url: this.question.fromUser.profileImg === 'default-pp.png' ? defaultPP : backendPP
        }; 
      }
    },
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    async answerQuestion() {
      if(this.answerText !== '') {
        this.confirmLoading = true;
        const result = await questionService.answerQuestion({
          questionId: this.question._id,
          answerText: this.answerText,
          fromUserId: this.loginUserId,
          toUserId: this.question.fromUser._id,
        });
        if (result.success) {
          this.$store.commit('InorDecreaseInboxCount', -1);
          this.$message.success('Answered!');
          this.$emit('delete-card');
        }
        this.visible = false;
        this.confirmLoading = false;
      } else {
        this.$message.error('Please input a answer text');
      }
    },
    handleCancel() {
      this.visible = false;
      this.answerText = '';
    },
    async deleteQuestion() {
      const result = await questionService.deleteQuestion({
        questionId: this.question._id,
        userId: this.loginUserId,
      });
      if (result.success) {
        this.$store.commit('InorDecreaseInboxCount', -1);
        this.$message.error('Deleted!');
        this.$emit('delete-card');
      }
    },
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

.card:last-child {
  margin-bottom: 55px;
}

.question-container {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5em;
  padding: 1em;
  max-height: 20em;
  overflow: auto;
  margin-bottom: 20px;
  margin-top: 5px;
}

.question-container.sender {
  margin-bottom: 0.5em;
  font-weight: 300;
}

.sender > a {
  color: #32afd3;
}

.question-container > span {
  white-space: pre-wrap;
}

.reply-button {
  font-size: unset;
  color: #32afd3;
  position: absolute;
  bottom: 0px;
  right: 0;
  border: none;
  box-shadow: none;
  padding-bottom: 1px;
  transition: none;
}

.reply-button:hover {
  border: 1px solid;
  background-color: #32afd3;
  color: white;
}

.author-name {
  font-size: 14px;
  color: #32afd3;
  font-weight: 500;
}

.avatar {
  display: inline;
  text-align: center;
  cursor: pointer;
}

.delete-button {
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  color: #8a8989;
}
.delete-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}


</style>