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
          <a slot="title" href="https://www.antdv.com/">{{item.username}}</a>
          <a-avatar
            slot="avatar"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
          />
        </a-list-item-meta>
        <div>
          <a-button type="dashed" size="small">Follow</a-button>
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
.reload {
  font-size: 16px;
  cursor: pointer;
}
.card:last-child {
  margin-bottom: 15px;
}
</style>