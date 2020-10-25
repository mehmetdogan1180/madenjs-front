export default {
  state: {
    sidebarCollapse: false,
  },
  getters: {
    isSidebarCollapse: (state) => state.sidebarCollapse,
  },
  mutations: {
    setSidebarCollapse(state, payload) {
      let command = payload;
      if (payload === undefined) {
        command = !state.sidebarCollapse;
      }
      state.sidebarCollapse = command;
    },
  },
  actions: {
    toggleSidebar({ commit }, payload) {
      commit('setSidebarCollapse', payload);
    },
  },
};
