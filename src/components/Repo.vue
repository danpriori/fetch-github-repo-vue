<template>
  <repo-content :repo="repo"></repo-content>
</template>

<script>
import RepoContent from "./RepoContent";
export default {
  props: ["repo"],
  components: {
    RepoContent
  }
};
</script>
