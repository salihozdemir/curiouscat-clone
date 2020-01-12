<template>
  <div class="card">
    <a-form :form="form" @submit.prevent="handleSubmit">
      <a-form-item style="margin-bottom: 5px;">
        <a-textarea
          style="padding: 10px;"
          placeholder="Ask something!"
          :autosize="{ minRows: 6, maxRows: 12 }"
          v-decorator="[
                'questionText',
                {
                  rules: [
                    { required: true, message: 'Please input your message!' }
                  ]
                }
              ]"
        />
      </a-form-item>

      <a-row type="flex" justify="center">
        <a-col :span="8">
          <a-form-item style="margin-bottom: 5px;">
            <a-switch
              checkedChildren="Anon"
              defaultChecked
              v-decorator="['isAnon', { initialValue: true }]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="16" style="text-align: right;">
          <a-form-item style="margin-bottom: 5px;">
            <a-button shape="round" type="primary" html-type="submit">Send</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
//TODO: V-decoreder işime yarıyor mu? Yaramıyorsa kaldır.
import { mapGetters } from 'vuex';
import questionService from '@/services/question';
import { async } from 'q';
export default {
  props: ['userId'],
  computed: {
    ...mapGetters(['loginUserId'])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'send_question' });
  },
  methods: {
    async handleSubmit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          (values.toUserId = this.userId), (values.fromUserId = this.loginUserId);
          const res = await questionService.createQuestion(values);
          if(res.success) {
            this.$message.success('Question sent!');
          }
        }
        this.form.resetFields();
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
  box-shadow: 0 0px 4px 0 rgba(0,0,0,0.2);
}
</style>    