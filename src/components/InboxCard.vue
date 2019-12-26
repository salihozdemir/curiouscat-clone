<template>
  <div class="card">
    <a-comment>
      <a slot="author">Han Solo</a>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
        size="large"
        style="text-align: -webkit-center;"
      ></a-avatar>
      <p slot="content">
        We supply a series of design principles, practical patterns and high quality design resources
        (Sketch and Axure).
      </p>
      <template slot="actions">
        <span @click="showDeleteConfirm" style="color: red">Sil</span>
        <span @click="showModal" style="color: #43bcff">Reply</span>
      </template>
    </a-comment>
    <a-modal
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      okText="Answer"
      :closable="false"
    >
      <div class="question-container">
        <div class="sender">
          <a href="#">Anon</a> asked
        </div>
        <span>My Name is Salaosdasld</span>
      </div>
      <a-textarea
        style="padding: 10px;"
        placeholder="Ask something!"
        :autosize="{ minRows: 6, maxRows: 12 }"
        :centered="true"
      />
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      deneme: null,
      visible: false,
      confirmLoading: false
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel(e) {
      this.visible = false;
    },
    showDeleteConfirm() {
        this.$confirm({
          title: 'Are you sure delete this task?',
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
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
    margin-bottom: .5em;
    font-weight: 300;
}

.question-container>span{
  white-space: pre-wrap;
}
</style>