<template>
  <div id="app">
    <div class="nav">
      <div id="header-nav" class="nav-bars">
        <v-tabs>
          <v-tab to="/">
            Home
          </v-tab>
          <v-tab to="/bookmarks">
            <v-badge
              color="rgba(155, 40, 40, 0.9)"
              bordered
              :value="getBookmarks"
              :content="getBookmarks"
            >
              Bookmarks
            </v-badge>
          </v-tab>
        </v-tabs>
      </div>
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
$main-bg-color: #589ceb;
$header-bg-color: #494f5a;
$text-color-white: rgb(138, 138, 138);
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
  .nav {
    display: flex;
    justify-content: center;
    width: 100%;
    position: fixed;
    background: #fff;
    -webkit-box-shadow: 0px 10px 18px -1px rgba(0, 0, 0, 0.33);
    -moz-box-shadow: 0px 10px 18px -1px rgba(0, 0, 0, 0.33);
    box-shadow: 0px 10px 18px -1px rgba(0, 0, 0, 0.33);
    .nav-bars {
      color: $text-color-white;
      a {
        color: $text-color-white;
      }
    }
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
