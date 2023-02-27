/*
 * @Author         : your name
 * @Date           : 2022-03-13 20:18:22
 * @LastEditTime: 2022-08-27 15:58:08
 * @LastEditors: Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sports-rules-admin\src\store\module\all_document.js
 */
import { api_document } from "src/api/index.js";
import { markRaw } from "vue";
export default {
  // namespaced: true,
  state: {
    all_documdent: [],
  },
  getters: {
    get_all_documdent(state) {
      return state.all_documdent;
    },
  },
  actions: {
    async set_all_documdent({ commit }, val) {
      /**
       * 获取所有问题主题
       */

      let params = {
        currentPage: 1,
        pageSize: 1000,
      };
      if (val && val.state) {
        params.state = val.state;
      }
      let res = await api_document.handle_read(params);

      let { code, msg, data } = res.data;
      let docs = data.docs || [];
      docs.map((val) => (val.name = val.id + "/" + val.name_zh));
      commit("set_all_documdent", docs);
    },
  },
  mutations: {
    set_all_documdent(state, all_documdent) {
      state.all_documdent = markRaw(all_documdent);
    },
  },
};
