<template>
  <div class="container">
    <div class="card">
      <a-comment>
        <a slot="author">Han Solo</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
          size="large"
          style="text-align: -webkit-center;"
        ></a-avatar>
        <p slot="content">
          We supply a series of design principles, practical patterns and high quality design resources
          (Sketch and Axure).
        </p>
        <a-comment>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
            size="large"
            style="text-align: -webkit-center;"
          />
          <p slot="content">
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
          </p>
        </a-comment>
      </a-comment>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.card {
  padding: 10px;
  background-color: white;
  margin-top: 10px;
  border-radius: 0.5rem;
}

.container:last-child {
  margin-bottom: 15px;
}
</style>