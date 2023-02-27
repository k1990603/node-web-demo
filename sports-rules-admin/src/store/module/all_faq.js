/*
 * @Author         : your name
 * @Date           : 2022-03-13 20:18:22
 * @LastEditTime   : 2022-04-11 13:30:24
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \client-api-doc-admin\src\store\module\window_resize.js
 */
import { api_faq } from "src/api/index.js";
import {markRaw} from "vue"
export default {
  // namespaced: true,
  state: {
    all_faq: [],
  },
  getters: {
    get_all_faq(state) {
      return state.all_faq;
    },
  },
  actions: {
    async set_all_faq({ commit }) {
      /**
       * 获取所有问题主题
       */

      let params = {
        currentPage: 1,
        pageSize: 1000,
      };
      let res = await api_faq.handle_read(params);

      let { code, msg, data } = res.data;
      console.log("获取列表", data);
      let docs = data.docs || [];

      commit("set_all_faq", docs);
    },
  },
  mutations: {
    set_all_faq(state, all_faq) {
      state.all_faq =  markRaw(all_faq);
    },
  },
};
