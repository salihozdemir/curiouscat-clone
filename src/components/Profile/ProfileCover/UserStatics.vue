<template>
  <a-row type="mode" justify="start" align="top">
    <a-card style="width: 300px; text-align: center;">
      <a-col :xs="{span: 4}" sm="">
        <small>Following</small>
        <p>50</p>
      </a-col>
      <a-col :xs="5" sm="6">
        <small>Followers</small>
        <p>100</p>
      </a-col>
      <a-col :xs="5" sm="6">
        <small>Answer Count</small>
          <p>50</p>
      </a-col>
    </a-card>
  </a-row>
</template>
<script>
export default {};
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
</style>