<template>
  <div class="home">
    <div class="input-container">
      <div class="input-group">
        <input type="text" v-on:keypress.enter="searchRepo" v-model="repo" />
        <button @click="searchRepo" type="submit">
          Search Repo
        </button>
        <transition name="fade">
          <div class="repolist-loading">
            <v-progress-circular
              v-if="showLoading"
              indeterminate
            ></v-progress-circular>
          </div>
        </transition>
      </div>
    </div>
    <div class="repolist-container">
      <repo-list @isLoading="checkLoading" :repoName="repoName"></repo-list>
    </div>
  </div>
</template>

<script>
import RepoService from "@/services/RepoService";
import RepoList from "@/components/RepoList";

export default {
  name: "Home",
  data() {
    return {
      repo: "",
      repoData: "",
      repoName: " ",
      isLoading: false
    };
  },
  components: {
    "repo-list": RepoList
  },
  computed: {
    showLoading() {
      return this.isLoading;
    }
  },
  methods: {
    searchRepo() {
      this.repoName = this.repo;
      this.$store.commit("searchRepoName", this.repoName);
    },
    checkLoading(isLoading) {
      this.isLoading = isLoading;
    }
  }
};
</script>

<style lang="scss">
// variables
$gray-solid1-border: 1px solid #878788;
$white: rgb(230, 230, 230);
$gray: #5d5f63;
$light-blue: #1c72d4;

.home {
  padding-top: 100px;
  align-items: center;
  justify-content: center;
  height: calc(100vh);
  overflow: auto;

  .input-container {
    margin-left: 20%;
    margin-right: 10%;
    width: 60%;

    .input-group {
      display: flex;
      justify-content: space-between;

      input {
        background-color: $white;
        box-sizing: border-box;
        width: calc(100% - 100px);
        padding: 0.5rem;
        border: $gray-solid1-border;
        font-size: 1rem;
        border-radius: 5px 0px 0px 5px;
        -webkit-appearance: none;
        outline: none;
      }

      button {
        width: 150px;
        height: 50px;
        -webkit-appearance: none;
        background: $light-blue;
        color: $white;
        text-transform: uppercase;
        border: none;
        border-radius: 0px 5px 5px 0px;
        font-size: 0.8rem;
        outline: none;
      }
      .repolist-loading {
        position: absolute;
        margin-top: 10px;
        right: 20px;
      }
    }
  }

  .repolist-container {
    clear: both;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin-left: 2%;
  }
}
</style>
