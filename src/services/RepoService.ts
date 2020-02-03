import Api from "@/services/Api";

const api = Api();

export default {
  getRepositories() {
    return api.get("/repositories");
  },
  getCustom(url: string) {
    return api.get(url);
  }
};
