<template>
  <div class="card">
    <a-list :dataSource="randomUsers">
      <div slot="header">
        <a-row type="flex" align="bottom">
          <a-col :span="3">
            <a-icon type="user" />
          </a-col>
          <a-col :span="18">
            <div style="font-size: 12px;">Who to follow</div>
          </a-col>
          <a-col :span="3">
            <a-icon class="reload" @click="refreshUsers" type="reload" :spin="false"></a-icon>
          </a-col>
        </a-row>
      </div>
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="String(item.answerCount) + ' Answers'">
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
          <a-button shape="round" class="follow-button" size="small">Follow</a-button>
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import userService from '@/services/user';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['randomUsers'])
  },
  created() {
    if(this.randomUsers === []) {
      this.getRandomUsers();
    }
  },
  methods: {
    ...mapActions(['getRandomUsers']),
    refreshUsers() {
      this.getRandomUsers();
    },
    getProfileImg(user) {
      const defaultPP = '/assets/img/default-pp.png';
      const backendPP = `${process.env.VUE_APP_API_URL}/${user._id}/${user.profileImg}`;
      return user.profileImg === 'default-pp.png' ? defaultPP : backendPP
    },
    goToProfile(value) {
      this.$router.push({
        name: 'Profile',
        params: { username: value }
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
}

.follow-button {
  border-color: #b1b0b0;
  border-style: solid;
}

a-avatar > img {
  padding: 2px;
  border: 2px solid rgba(0,0,0,.1);
}
</style>