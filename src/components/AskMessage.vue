<template>
  <div class="card">
    <a-form :form="form" :hideRequiredMark="true" @submit.prevent="handleSubmit">
      <a-form-item style="margin-bottom: 5px;">
        <a-textarea
          style="padding: 10px;"
          placeholder="Ask something!"
          :autosize="{ minRows: 6, maxRows: 12 }"
          v-decorator="[
                'message',
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
              v-decorator="['switch', { valuePropName: 'true' }]"
              defaultChecked
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
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'send_question' });
  },
  methods: {
    handleSubmit() {
      this.form.validateFields((err, values) => {
        console.log(err);
        console.log(values);
        this.form.resetFields();
      });
    }
  }
};
</script>
<style scoped>
.card {
  padding: 10px;
  background-color: white;
  margin-top: 10px;
}
</style>    