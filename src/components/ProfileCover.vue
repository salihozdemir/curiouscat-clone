<template>
  <a-row type="flex" class="header">
    <div class="banner background"></div>
    <div class="banner background-cover"></div>
    <div v-if="loading" class="spin">
      <a-spin size="large" />
    </div>
    <a-col v-else span="24">
      <a-row type="flex" justify="center" class="text-center">
        <a-col :span="4">
          <div class="profile-avatar">
            <img :src="getPhotoUrl" @click="$refs.file.click()" />
          </div>
          <input
            ref="file"
            type="file"
            @change="changePP($event)"
            class="form-control"
            hidden
            v-if="isOwnProfile"
          />
        </a-col>
        <a-button
          icon="poweroff"
          type="danger"
          shape="circle"
          class="logout"
          @click="logout"
          v-if="isOwnProfile"
        ></a-button>
      </a-row>
      <a-row type="flex" justify="center" class="text-center">
        <a-col :span="4">
          <a class="usermame">{{userName}}</a>
          <a-button
            style="font-weight: bold;"
            @click="followOrUnFollow"
            type="primary"
            shape="round"
            icon="user-add"
          >{{isFollow ? 'unFollow' : 'Follow'}}</a-button>
        </a-col>
      </a-row>
      <br />
      <a-row type="flex" justify="space-around" class="text-center">
        <a-col :span="4">
          <span class="title">Answers</span>
          <span class="num">{{answerCount}}</span>
        </a-col>
        <a-col :span="4" @click="followersVisible = true" class="cursor-pointer">
          <span class="title">Followers</span>
          <span class="num">{{userFollowers.length}}</span>
        </a-col>
        <a-col :span="4" @click="followingVisible = true" class="cursor-pointer">
          <span class="title">Following</span>
          <span class="num">{{userFollowings.length}}</span>
        </a-col>
      </a-row>
    </a-col>
    <a-modal title="Followers" v-model="followersVisible" :footer="null" centered>
      <a-list itemLayout="horizontal" :dataSource="userFollowers">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta :description="String(item.answerCount) + ' Answers'">
            <a slot="title" @click="goToProfile(item.username)">{{item.username}}</a>
            <a-avatar
            slot="avatar"
            :src="getProfileImg(item)"
            @click="goToProfile(item.username)"
            :size="40"
            class="avatar"
          />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-modal>
    <a-modal v-model="followingVisible" title="Following" :footer="null" centered>
      <a-list itemLayout="horizontal" :dataSource="userFollowings">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta :description="String(item.answerCount) + ' Answers'">
            <a slot="title" @click="goToProfile(item.username)">{{item.username}}</a>
            <a-avatar
            slot="avatar"
            :src="getProfileImg(item)"
            @click="goToProfile(item.username)"
            :size="40"
            class="avatar"
          />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-modal>
  </a-row>
</template>
<script>
import { mapGetters } from 'vuex';
import common from '@/common';
import userService from '@/services/user';
import followService from '@/services/follow';
export default {
  props: ['userImg', 'userName', 'userId', 'isFollow', 'loading', 'answerCount'],
  data() {
    return {
      followersVisible: false,
      followingVisible: false,
      userFollowers: [],
      userFollowings: [],
    };
  },
  computed: {
    ...mapGetters(['loginUserId']),
    getPhotoUrl() {
      if (this.userImg === 'default-pp.png') {
        return '/assets/img/default-pp.png';
      } else {
        return `${process.env.VUE_APP_API_URL}/${this.userId}/${this.userImg}`;
      }
    },
    isOwnProfile() {
      if (this.userId === this.loginUserId) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.getFollowersUser();
    this.getFollowingUser();
  },
  methods: {
    async changePP(event) {
      const pp = event.target.files[0];
      if (pp.type === 'image/png' || pp.type === 'image/jpeg') {
        const formData = new FormData();
        formData.append('id', this.loginUserId);
        formData.append('profileImg', pp, pp.name);
        const result = await userService.uploadProfilePhoto(formData);
        this.$emit('update:userImg', result.profileImg);
      } else {
        this.$message.error('Please upload jpeg or png file type.');
      }
    },
    logout() {
      common.cookie.set('access_token', '', 0);
      this.$store.commit('setToken', null);
      this.$router.push({ name: 'Auth' });
      this.$store.commit('setRandomUsers', []);
    },
    async followOrUnFollow() {
      const result = await followService.followOrUnFollow({
        toUserId: this.userId,
        fromUserId: this.loginUserId,
      });
      this.$emit('update:isFollow', result.isFollow);
    },
    async getFollowersUser() {
      const followers = await followService.getUserFollowers(this.loginUserId);
      this.userFollowers = followers.users;
    },
    async getFollowingUser() {
      const followings = await followService.getUserFollowings(this.loginUserId);
      this.userFollowings = followings.users;
    },
    getProfileImg(user) {
      const defaultPP = '/assets/img/default-pp.png';
      const backendPP = `${process.env.VUE_APP_API_URL}/${user._id}/${user.profileImg}`;
      return user.profileImg === 'default-pp.png' ? defaultPP : backendPP
    },
    goToProfile(value) {
      this.followersVisible = false,
      this.followingVisible = false,
      this.$router.push({
        name: 'Profile',
        params: { username: value }
      }); 
    }
  },
};
</script>
<style scoped>
.text-center {
  text-align: center;
  color: white;
}

.usermame {
  font-size: 1.7rem;
  color: #fff;
  text-transform: capitalize;
  font-weight: bold;
  display: block;
}

.cursor-pointer {
  cursor: pointer;
}

.profile-avatar {
  display: inline-block;
  margin: 0.5em 0;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  position: relative;
  background: linear-gradient(45deg, #d7d7d7, #fff);
  box-shadow: 0 0 0 2px hsla(0, 0%, 100%, 0.5);
  cursor: pointer;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.avatar {
  display: inline;
  text-align: center;
  cursor: pointer;
}

.header {
  position: relative;
  font-family: 'Roboto', sans-serif;
  padding: 0.5rem 0px 0.5rem 0px;
}

.banner {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

.background {
  background-image: linear-gradient(140deg, #32aff8 50%, #32aff8);
  background-size: cover;
  background-position: 50%;
}

.background-cover {
  -webkit-transform: scale(1.0001);
  transform: scale(1.0001);
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4));
}

.title {
  font-size: 15px;
  display: block;
}

.num {
  font-size: 1.75em;
  margin: 0.1em 0;
}

.logout {
  position: absolute;
  right: 8px;
  top: 0;
}

.spin {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 20vh;
  width: 100%
}
</style>