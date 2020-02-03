<template>
  <div class="repolist-container">
    <div class="msg">{{ msg }}</div>
    <div class="repolist-columns">
      <div class="repolist">
        <repo
          v-for="(repo, index) in repos"
          :key="index"
          :repo="repo"
          :arrayIndex="index"
        >
        </repo>
      </div>
    </div>
  </div>
</template>

<script>
import Repo from "@/components/Repo";
import RepoService from "@/services/RepoService";

export default {
  name: "RepoList",
  props: ["repoName"],
  data() {
    return {
      repos: [],
      reposFound: [],
      msg: ""
    };
  },
  watch: {
    repoName(val) {
      this.getRepo(val);
    }
  },
  components: {
    repo: Repo
  },
  methods: {
    async getRepositories() {
      return await RepoService.getRepositories();
    },
    getRepo(repoName) {
      if (repoName === "") {
        this.msg = "Please enter a repo name.";
        this.repoData = "";
        return false;
      }
      this.$emit("isLoading", true);
      this.getRepositories().then(response => {
        this.$emit("isLoading", false);
        this.repos = response.data.filter(repo => repo.name === repoName);
        if ((this.repos && this.repos.length === 0) || !this.repos) {
          this.msg = "Repo not found.";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.repolist-container {
  margin-top: 60px;
  overflow: auto;
  .msg {
    color: #c5c5c5;
    padding: 10px;
    max-height: 150px;
  }
  .repolist-columns {
    width: 100%;
    margin: 0 auto;
    text-align: left;
    .repolist {
      overflow: auto;
    }
  }
}
</style>
