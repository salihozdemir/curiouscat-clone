<template>
  <div class="card">
    <a-list>
      <div class="border-bottom-0">
        <div slot="header" class="border-bottom-0">
          <a-auto-complete auto-focus placeholder="Username" style="width: 100%;">
            <a-input v-model="searchText">
              <a-icon slot="suffix" type="search" />
            </a-input>
          </a-auto-complete>
        </div>
      </div>
      <a-list-item style="margin-top: 5px;" class="border-bottom-0">
        <a-list-item-meta description="Progresser AFX">
          <a slot="title" href="https://www.antdv.com/">{{isTyping}}</a>
          <a-avatar
            slot="avatar"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </a-list-item-meta>
        <div>
          <a-button type="dashed">Follow</a-button>
        </div>
      </a-list-item>
      <!-- <a-list-item class="border-bottom-0">
        <a-list-item-meta description="Progresser AFX">
          <a slot="title" href="https://www.antdv.com/">Salih</a>
          <a-avatar
            slot="avatar"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </a-list-item-meta>
        <div>
          <a-button type="dashed">Follow</a-button>
        </div>
      </a-list-item>
      <a-list-item class="border-bottom-0">
        <a-list-item-meta description="Progresser AFX">
          <a slot="title" href="https://www.antdv.com/">Salih</a>
          <a-avatar
            slot="avatar"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </a-list-item-meta>
        <div>
          <a-button type="dashed">Follow</a-button>
        </div>
      </a-list-item> -->
    </a-list>
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
      this.isTyping = true;
      if(newValue.length >= 3) {
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
}
</style>