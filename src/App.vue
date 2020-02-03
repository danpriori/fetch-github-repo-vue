<template>
  <div id="app">
    <div id="header-nav" class="nav-bars">
      <router-link to="/">Home</router-link> |
      <router-link to="/bookmarks">
        <v-badge
          color="rgba(155, 40, 40, 0.5)"
          bordered
          :value="getBookmarks"
          :content="getBookmarks"
        >
          Bookmarks
        </v-badge>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    getBookmarks() {
      return this.$store.getters.getBookmarks.length;
    }
  }
};
</script>

<style lang="scss">
// variables
$main-bg-color: #6c7686;
$header-bg-color: #494f5a;
$text-color-white: rgb(197, 197, 197);
$text-color-white-hover: rgb(236, 236, 236);

body {
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: $main-bg-color;
  .nav-bars {
    background: $header-bg-color;
    position: fixed;
    width: 100%;
    padding: 20px 10px 10px 10px;
    color: $text-color-white;

    a {
      color: $text-color-white;
      text-decoration: none;
      :hover {
        color: $text-color-white-hover;
      }
    }
  }

  #header-nav {
    top: 0;
    left: 0;
  }

  #footer-nav {
    bottom: 0;
    left: 0;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
