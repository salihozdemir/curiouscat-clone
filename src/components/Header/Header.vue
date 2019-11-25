<template>
  <nav class="navbar sticky-top navbar-expand-sm navbar-dark bg-info">
    <div class="container">
      <router-link to="/" tag="a" class="navbar-brand site-name">
        Question
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav m-auto">
          <li class="nav-item">
            <router-link
              to="/"
              tag="a"
              exact-active-class="active"
              class="nav-link"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/Discover"
              tag="a"
              active-class="active"
              class="nav-link"
              >Discover
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/Profile"
              tag="a"
              active-class="active"
              class="nav-link"
              >Profile
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/Inbox"
              tag="a"
              active-class="active"
              class="nav-link"
              >Inbox</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script></script>

<style scoped>
.navbar {
  box-shadow: 0 1px 1px gray;
}

.active {
  box-shadow: 0px 3px;
}

.navbar-brand {
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 27px;
}

@font-face {
  font-family: site-name;
  src: url('../../assets/font/bakeapple.otf');
}

.site-name {
  font-family: site-name;
  color: #727273;
  text-align: center !important;
}
</style>
