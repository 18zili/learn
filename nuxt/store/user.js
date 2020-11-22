export const state = () => ({
  token: ""
});

export const mutations = {
  init(state, token) {
    state.token = token;
  }
};

export const getters = {
  isLogin(state) {
    return !!state.token;
  }
};

export const actions = {
  async login({ commit, getters }, user) {
    const { ok, token } = await this.$axios.$post("/api/login", user);
    if (ok) {
      commit("init", token);
      return ok;
    }
    return getters.isLogin;
  }
};
