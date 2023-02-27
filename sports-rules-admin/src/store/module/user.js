/*
 * @Author         : your name
 * @Date           : 2022-03-13 20:18:22
 * @LastEditTime: 2022-07-31 17:43:35
 * @LastEditors: Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sports-rules-admin\src\store\module\user.js
 */

export default {
  // namespaced: true,
  state: {
    user: {},
  },
  getters: {
    get_user(state) {
      return state.user;
    },
  },
  actions: {
    set_user({ commit }, user) {
      commit("set_user", user);
    },
  },
  mutations: {
    set_user(state, user) {
      state.user = user;
    },
  },
};
