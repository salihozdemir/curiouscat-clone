<template>
  <div class="card" id="whoToFollow">
    <a-skeleton active v-if="initLoading"></a-skeleton>
    <a-list v-else :loading="isLoadingUsers" :dataSource="randomUsers">
      <div slot="header">
        <a-row type="flex" align="bottom">
          <a-col :span="3">
            <a-icon type="user" />
          </a-col>
          <a-col :span="18">
            <div style="font-size: 12px;">Who to follow</div>
          </a-col>
          <a-col :span="3">
            <a-icon class="reload" @click="refreshUsers" type="reload" :spin="isLoadingUsers"></a-icon>
          </a-col>
        </a-row>
      </div>
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="String(item.answerCount) + ' Answers'">
          <router-link slot="title" :to="'../Profile/' + item.username" class="username">{{item.username}}</router-link>
          <router-link slot="avatar" :to="'../Profile/' + item.username">
            <a-avatar
              :src="getProfileImg(item)"
              :size="40"
              class="avatar" />
          </router-link>
        </a-list-item-meta>
          <a-button 
            shape="round" 
            class="follow-button" 
            size="small" 
            @click="followOrUnFollow(item._id)"
          >
            {{item.text}}
          </a-button>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import userService from '@/services/user';
import followService from '@/services/follow';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      isLoadingUsers: false,
      initLoading: true,
    }
  },
  computed: {
    ...mapGetters(['randomUsers', 'loginUserId'])
  },
  async created() {
    if(this.randomUsers.length === 0) {
      await this.getRandomUsers();
    }
    this.initLoading = false;
  },
  methods: {
    ...mapActions(['getRandomUsers']),
    async refreshUsers() {
      this.isLoadingUsers = true;
      await this.getRandomUsers();
      this.isLoadingUsers = false;
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
      });
      this.$store.commit('changeUserText', {
        text: result.buttonText,
        _id: userId
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
.reload {
  font-size: 16px;
  cursor: pointer;
}
.card:last-child {
  margin-bottom: 15px;
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

a-avatar > img {
  padding: 2px;
  border: 2px solid rgba(0,0,0,.1);
}
</style>