<template>
  <div>
    <a-row type="flex" justify="start" align="top" class="text-center">
      <a-col :sm="7">
        <small>Following</small>
        <p @click="() => setModal1Visible(true)">50</p>
      </a-col>
      <a-col :sm="7">
        <small>Followers</small>
        <p @click="() => setModal1Visible(true)">100</p>
      </a-col>
      <a-col :sm="10">
        <small>Answer Count</small>
        <p @click="() => setModal1Visible(true)">50</p>
      </a-col>
    </a-row>

    <a-modal :visible="setModalFollowing" title="Basic Modal" @ok="() => setModal1Visible(false)">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

     <a-modal :visible="setModalFollowing" title="Basic Modal" @ok="() => setModal1Visible(false)">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>

     <a-modal :visible="setModalFollowing" title="Basic Modal" @ok="() => setModal1Visible(false)">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </div>
</template>
<script>
export default {
   data() {
      return {
        setModalFollowing: false,
      };
    },
    methods: {
      setModal1Visible(followingModelVisible) {
        this.setModalFollowing = followingModelVisible;
      },  
    }
};
</script>
<style scoped>
p {
  padding-top: 1px;
  color: #1890ff;
  cursor: pointer;
}
p:hover {
  box-shadow: 0px 2px 0px 0px;
}

.text-center {
  text-align: center;
}
</style>