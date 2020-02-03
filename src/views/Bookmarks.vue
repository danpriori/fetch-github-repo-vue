<template>
  <div class="bookmarks">
    <div class="bookmarks-container">
      <div class="bookmarks-columns">
        <div class="repolist">
          <repo
            v-for="(repo, index) in repos"
            :key="index"
            :repo="repo[0]"
            :arrayIndex="index"
          >
          </repo>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Repo from "@/components/Repo";
import RepoService from "@/services/RepoService";

export default {
  name: "Bookmarks",
  data() {
    return {
      repos: [],
      bookmarksList: [],
      bookmarks: []
    };
  },
  mounted() {
    this.bookmarksList = this.getBookmarks();
    this.getRepositories().then(response => {
      this.bookmarks = this.bookmarksList.filter(bookmark => {
        this.repos.push(response.data.filter(repo => repo.id === bookmark));
      });
    });
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
    getBookmarks() {
      return this.$store.getters.getBookmarks;
    },
    async getRepositories() {
      return await RepoService.getRepositories();
    }
  }
};
</script>
<style lang="scss" scoped>
.bookmarks {
  padding-top: 100px;
  align-items: center;
  justify-content: center;
  height: calc(100vh);
  overflow: auto;
  .bookmarks-container {
    .bookmarks-columns {
      width: 80%;
      margin: 0 auto;
      text-align: left;
      align-items: center;
    }
  }
}
</style>
