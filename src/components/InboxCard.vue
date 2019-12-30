<template>
  <div class="card" v-if="cardVisible">
    <a-comment>
      <a slot="author">{{getUserInfo.name}}</a>
      <a-avatar
        slot="avatar"
        :src="getUserInfo.url"
        :alt="getUserInfo.name"
        size="large"
        style="text-align: -webkit-center;"
      ></a-avatar>
      <p slot="content">{{question.questionText}}</p>
      <template slot="actions">
        <span @click="showDeleteConfirm(question._id)" style="color: red">Sil</span>
        <span @click="showModal" style="color: #43bcff">Reply</span>
      </template>
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
          <a href="#">{{getUserInfo.name}}</a> asked
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
import questionService from '@/services/question';
export default {
  props: ['question'],
  data() {
    return {
      visible: false,
      confirmLoading: false,
      cardVisible: true,
      answerText: ''
    };
  },
  computed: {
    getUserInfo() {
      if (this.question.isAnon) {
        return {
          name: 'Anonymous',
          url: 'assets/img/anonymous-pp.png'
        };
      } else {
        return {
          name: this.question.fromUser.username,
          url: `https://question-node-api.herokuapp.com/${this.question.fromUser._id}/${this.question.fromUser.profileImg}`
        };
      }
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    async answerQuestion() {
      this.confirmLoading = true;
      const result = await questionService.answerQuestion(this.question._id, {
        value: this.answerText
      });
      if (result.success) {
        this.$message.success('Answered!');
        this.cardVisible = false;
      }
      this.visible = false;
      this.confirmLoading = false;
    },
    handleCancel() {
      this.visible = false;
      this.answerText = '';
    },
    showDeleteConfirm(questionId) {
      this.$confirm({
        title: 'Are you sure delete this question?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          const result = await questionService.deleteQuestion(questionId);
          this.deneme(result);
        }
      });
    },
    deneme(result) {
      if (result.success) {
        this.$message.error('Deleted!');
        this.cardVisible = false;
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

.question-container > span {
  white-space: pre-wrap;
}
</style>