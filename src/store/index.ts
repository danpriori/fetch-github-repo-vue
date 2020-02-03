import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const results: number[] = [];

export default new Vuex.Store({
  state: {
    bookmarks: results,
    searchRepoName: ""
  },
  mutations: {
    addBookmark: (state, repoID: number) => {
      state.bookmarks.push(repoID);
    },
    removeBookmark: (state, repoID: number) => {
      state.bookmarks = state.bookmarks.filter(obj => obj !== repoID);
    },
    searchRepoName: (state, payload) => {
      state.searchRepoName = payload;
    }
  },
  getters: {
    getBookmarks: state => {
      return state.bookmarks;
    },
    getBookmark: state => (repoID: number) => {
      return state.bookmarks.filter(obj => obj == repoID);
    }
  },
  plugins: [createPersistedState()]
});
