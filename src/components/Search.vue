<template>
  <div class="card">
    <a-config-provider>
      <template v-slot:renderEmpty>
        
      </template>
      <a-list :dataSource="searchResult" :loading="isTyping">
        <div slot="header" >
          <a-input auto-focus placeholder="Username" v-model="searchText">
            <a-icon slot="suffix" type="search" />
          </a-input>
        </div>
        <a-list-item style="margin-top: 5px;" class="border-bottom-0" slot="renderItem" slot-scope="item">
          <a-list-item-meta :description="String(item.answerCount) + ' Answered'">
            <a slot="title" href="https://www.antdv.com/">{{item.username}}</a>
            <a-avatar
              slot="avatar"
              src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            />
          </a-list-item-meta>
          <div>
            <a-button type="dashed">Follow</a-button>
          </div>
        </a-list-item>
      </a-list>
    </a-config-provider>
  </div>
</template>
<script>
import userService from '@/services/user';
import _ from 'lodash';
export default {
  data() {
    return {
      searchResult: [],
      searchText: '',
      isTyping: false
    }
  },
  watch: {
    searchText(newValue) {
      if(newValue.length >= 3) {
        this.isTyping = true;
        this.debouncedGetUser();
      }
    }
  },
  created() {
    this.debouncedGetUser =  _.debounce(this.searchUser, 500);
  },
  methods: {
    async searchUser() {
      const result = await userService.searchUsers({
        username: this.searchText
      });
      this.searchResult = result.users;
      this.isTyping = false;
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
  margin-bottom: 20px;
}
</style>