<template>
  <div class="repo-content">
    <transition name="fade">
      <modal v-if="showModal" @close="showModal = false">
        <div slot="header">
          <div class="repo-name">
            {{ repo.name }}
          </div>
          <div class="repo-github-link">
            <a :href="repo.html_url" target="_blank"
              ><v-icon>{{ iconGithubLink }}</v-icon>
            </a>
          </div>
        </div>
        <div slot="body">
          <div class="repo-owner">
            {{ repo.owner ? repo.owner.login : "" }}
          </div>
          <div class="repo-description">
            {{ repo.description ? repo.description : "" }}
          </div>
          <div class="repo-date">
            {{ repo.updated_at | translateDate }}
          </div>
        </div>
      </modal>
    </transition>
    <div class="repo-bookmark">
      <div @click="toggleBookmark" class="bookmark">
        <v-icon>{{ iconBookmark }}</v-icon>
      </div>
    </div>
    <div class="repo-title" @click="showModal = true">
      <text-holder width="150px" height="23px" :showContent="!!repo.name">
        {{ repo.name }}
      </text-holder>
    </div>
    <div class="repo-desc">
      <text-holder
        width="260px"
        height="21px"
        :showContent="repo.owner ? !!repo.owner.login : ''"
      >
        {{ repo.owner ? repo.owner.login : "" }}
      </text-holder>
    </div>

    <div class="repo-info">
      <div class="repo-stats">
        <v-icon>{{ iconStar }}</v-icon
        >{{ stars }} <v-icon>{{ iconFork }}</v-icon
        >{{ forks }}
        <div class="repo-details-icon" @click="showModal = true">
          <v-icon>{{ iconInfo }}</v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RepoService from "@/services/RepoService";
import TextHolder from "./TextHolder";
import Modal from "./Modal";
import moment from "moment";

export default {
  props: ["repo"],
  data() {
    return {
      showModal: false,
      stars: 0,
      forks: 0
    };
  },
  mounted() {
    this.requestStars();
    this.requestForks();
  },
  components: {
    TextHolder,
    Modal
  },
  watch: {
    repo(val) {
      this.requestStars();
      this.requestForks();
    }
  },
  filters: {
    translateDate(date) {
      return `Updated at ${moment(date).fromNow()}`;
    }
  },
  computed: {
    iconBookmark() {
      const reposFound = this.getBookmark(this.repo.id);
      if (reposFound.length > 0) {
        return this.$vuetify.icons.values.bookmarkOn;
      } else {
        return this.$vuetify.icons.values.bookmarkOff;
      }
    },
    iconStar() {
      return this.$vuetify.icons.values.iconStar;
    },
    iconFork() {
      return this.$vuetify.icons.values.iconFork;
    },
    iconInfo() {
      return this.$vuetify.icons.values.iconInfo;
    },
    iconGithubLink() {
      return this.$vuetify.icons.values.iconGithubLink;
    }
  },
  methods: {
    requestStars() {
      RepoService.getCustom(this.repo.stargazers_url).then(response => {
        this.stars = response.data.length;
      });
    },
    requestForks() {
      RepoService.getCustom(this.repo.forks_url).then(response => {
        this.forks = response.data.length;
      });
    },
    toggleBookmark() {
      const reposFound = this.getBookmark(this.repo.id);
      if (reposFound.length > 0) {
        this.$store.commit("removeBookmark", this.repo.id);
        this.showToasted(" Bookmark removed ");
      } else {
        this.$store.commit("addBookmark", this.repo.id);
        this.showToasted(" Bookmark added ");
      }
    },
    getBookmark(repoID) {
      return this.$store.getters.getBookmark(repoID);
    },
    showToasted(msg) {
      let toast = this.$toasted.show(msg, {
        type: "success",
        position: "top-right",
        duration: 5000,
        icon: "",
        className: ["toasted"],
        action: [
          {
            text: "Undo",
            onClick: (e, toastObject) => {
              this.toggleBookmark();
              toastObject.goAway(200);
            }
          },
          {
            text: "Close",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss">
v-icon {
  outline: none;
}
a {
  text-decoration: none;
}
.toasted {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 13px;
}
.repo-content {
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  border: solid 0.5px #e5e5e5;
  margin-bottom: 5px;
  display: block;
  text-decoration: none !important;
  overflow: hidden;
  .repo-bookmark {
    float: right;
    letter-spacing: 0.3px;
    margin: 10px;
    .bookmark {
      width: 20px;
      height: 20px;
    }
    :hover {
      cursor: pointer;
    }
  }
  .repo-pretitle {
    font-size: 13px;
    letter-spacing: -0.1px;
    color: #5c6877;
  }
  .repo-title {
    font-size: 18px;
    color: #5c6877;
    letter-spacing: -0.2px;
    line-height: 1.3;
    margin-bottom: 7px;
    :hover {
      cursor: pointer;
    }
  }
  .repo-desc {
    font-size: 14px;
    line-height: 1.5;
    color: #77818e;
    margin-top: 5px;
    word-wrap: break-word;
  }
  .repo-date {
    font-size: 13px;
    color: #aeb6c0;
    margin-top: 5px;
  }
  .repo-info {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  .repo-language {
    font-size: 14px;
    color: #8f9aa8;
    letter-spacing: 0.3px;
  }
  .repo-github-link {
    float: right;
  }
  .repo-stats {
    font-size: 14px;
    color: #77818e;
    letter-spacing: 0.3px;
    .repo-details-icon {
      float: right;
      margin-left: 5px;
      :hover {
        cursor: pointer;
      }
    }
  }
}
</style>
