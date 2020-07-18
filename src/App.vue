<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login">登录</router-link>|
      <router-link to="/about">About</router-link> |
      <router-link to="/" @click.native="logout">注销</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Cookie from "js-cookie";
export default class App extends Vue {
  logout() {
    Cookie.remove("token");
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
