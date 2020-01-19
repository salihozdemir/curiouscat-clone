<template>
  <div class="card" id="discover">
    <a-list :dataSource="searchResult" :loading="isTyping">
      <div slot="header" >
        <a-input auto-focus placeholder="Username" v-model="searchText">
          <a-icon slot="suffix" type="loading-3-quarters" :spin="true" style="color: #32afd3;" v-if="isTyping"></a-icon>
          <a-icon slot="suffix" type="search" v-else />
        </a-input>
      </div>
      <a-list-item style="margin-top: 5px;" class="border-bottom-0" slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="String(item.answerCount) + ' Answered'">
          <a slot="title" @click="goToProfile(item.username)" class="username">{{item.username}}</a>
          <a-avatar
            slot="avatar"
            :src="getProfileImg(item)"
            @click="goToProfile(item.username)"
            :size="40"
            class="avatar"
          />
        </a-list-item-meta>
        <div>
          <a-button 
            shape="round" 
            class="follow-button" 
            size="small"
            @click="followOrUnFollow(item._id)"
            >
              {{item.following ? 'unFollow' : 'Follow'}}
          </a-button>
        </div>
      </a-list-item>
      <p v-if="noDataText" class="no-data-text">Nothing found!</p>
    </a-list>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import followService from '@/services/follow';
import userService from '@/services/user';
import _ from 'lodash';

export default {
  data() {
    return {
      searchResult: [],
      searchText: '',
      isTyping: false,
      noDataText: false,
    }
  },
  computed: {
    ...mapGetters(['loginUserId', 'loginUserName']),
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
        username: this.searchText,
        fromUserId: this.loginUserId
      });
      this.searchResult = result.users;
      this.isTyping = false;
      if(this.searchResult.length === 0) this.noDataText = true;
      else this.noDataText = false; 
    },
    goToProfile(value) {
      this.$router.push({
        name: 'Profile',
        params: { username: value }
      }); 
    },
    getProfileImg(user) {
      const defaultPP = '/assets/img/default-pp.png';
      const backendPP = `${process.env.VUE_APP_API_URL}/${user._id}/${user.profileImg}`;
      return user.profileImg === 'default-pp.png' ? defaultPP : backendPP
    },
    async followOrUnFollow(userId) {
      const result = await followService.followOrUnFollow({
        toUserId: userId,
        fromUserId: this.loginUserId,
        fromUsername: this.loginUserName
      });
      const clickedUser = this.searchResult.find(x => x._id === userId);
      clickedUser.following = result.isFollow;
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
  margin-bottom: 20px;
  box-shadow: 0 0px 4px 0 rgba(0,0,0,0.2);
}

.no-data-text {
  text-align: center;
  color: #8a8989;
}

.username {
  color: #32afd3;
  font-size: 14px;
}

.avatar {
  display: inline;
  text-align: center;
  cursor: pointer;
}

.follow-button {
  border-color: #b1b0b0;
  border-style: solid;
}

.follow-button:hover, .follow-button:focus {
  color: unset;
}
</style>