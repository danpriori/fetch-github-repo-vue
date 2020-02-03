import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
    values: {
      bookmarkOn: "mdi-alpha-b-circle",
      bookmarkOff: "mdi-alpha-b-circle-outline",
      iconInfo: "mdi-information-outline",
      iconStar: "mdi-star",
      iconFork: "mdi-source-fork",
      iconGithubLink: "mdi-github-circle"
    }
  }
});
