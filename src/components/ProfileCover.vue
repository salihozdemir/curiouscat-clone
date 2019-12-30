<template>
  <a-row type="flex" class="header">
    <div class="banner background"></div>
    <div class="banner background-cover"></div>
    <a-col span="24">
      <a-row type="flex" justify="center" class="text-center">
        <a-col :span="4">
          <div class="avatar">
            <img :src="getPhotoUrl" @click="$refs.file.click()" />
          </div>
          <input ref="file" type="file" @change="changePP($event)" class="form-control" hidden />
        </a-col>
        <a-button icon="poweroff" type="danger" shape="circle" class="logout" @click="logout"></a-button>
      </a-row>
      <a-row type="flex" justify="center" class="text-center">
        <a-col :span="4">
          <a class="usermame">{{userName}}</a>
          <a-button style="font-weight: bold;" type="primary" shape="round" icon="user-add">Follow</a-button>
        </a-col>
      </a-row>
      <br />
      <a-row type="flex" justify="space-around" class="text-center">
        <a-col :span="4">
          <span class="title">Answers</span>
          <span class="num">10</span>
        </a-col>
        <a-col :span="4" @click="followersVisible = true" class="cursor-pointer">
          <span class="title">Followers</span>
          <span class="num">15</span>
        </a-col>
        <a-col :span="4" @click="followingVisible = true" class="cursor-pointer">
          <span class="title">Following</span>
          <span class="num">20</span>
        </a-col>
      </a-row>
    </a-col>
    <a-modal title="Followers" v-model="followersVisible" :footer="null">
      <a-list itemLayout="horizontal" :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta description="25 Answered">
            <a slot="title" href="https://www.antdv.com/">{{item.title}}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-modal>
    <a-modal v-model="followingVisible" title="Following" :footer="null">
      <a-list itemLayout="horizontal" :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta description="25 Answered">
            <a slot="title" href="https://www.antdv.com/">{{item.title}}</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
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
export default {
  props: ['userImg','userName','userId'],
  data() {
    return {
      followersVisible: false,
      followingVisible: false,
      data: [
        {
          title: 'Ali Özdemir'
        },
        {
          title: 'Salih Özdemir'
        },
        {
          title: 'Ayşenur Özdemir'
        },
        {
          title: 'İbrahim Parlak'
        }
      ],
    };
  },
  computed: {
    ...mapGetters(['loginUserId']),
    getPhotoUrl() {
      if(this.userImg === 'default-pp.png'){
        return `https://question-node-api.herokuapp.com/${this.userImg}`;
      } else {
        return `https://question-node-api.herokuapp.com/${this.userId}/${this.userImg}`;
      }
    }
  },
  methods: {
    async changePP(event) {
      const pp = event.target.files[0];
      if (pp.type === 'image/png' || pp.type === 'image/jpeg') {
        const formData = new FormData();
        formData.append('id', this.loginUserId);
        formData.append('profileImg', pp, pp.name);
        const result = await userService.uploadProfilePhoto(formData);
        console.log(result);
        this.$emit('update:userImg', result.profileImg);
      } else {
        this.$message.error('Please upload jpeg or png file type.');
      }
    },
    logout() {
      common.cookie.set('access_token', '', 0);
      this.$store.commit('setToken', null);
      this.$store.commit('setloginUserName', '');
      this.$store.commit('setLoginUserId', '');
      this.$router.push({ name: 'Auth' });
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

.avatar {
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

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  background-image: linear-gradient(140deg, #5ad8b1 50%, #4adcae);
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
</style>