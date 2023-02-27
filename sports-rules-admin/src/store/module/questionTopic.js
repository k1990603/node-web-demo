/*
 * @Author         : your name
 * @Date           : 2022-03-13 20:18:22
 * @LastEditTime   : 2022-04-05 14:14:03
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \client-api-doc-admin\src\store\module\window_resize.js
 */
import { api_questionTopic } from "src/api/index.js";
export default {
  // namespaced: true,
  state: {
    questionTopic: [],
  },
  getters: {
    get_questionTopic(state) {
      return state.questionTopic;
    },
  },
  actions: {
    async set_questionTopic({ commit }) {
      /**
       * 获取所有问题主题
       */

      let params = {
        currentPage: 1,
        pageSize: 1000,
      };
      let res = await api_questionTopic.handle_read(params);

      let { code, msg, data } = res.data;
      console.log("获取列表", data);
      let docs = data.docs || [];

      commit("set_questionTopic", docs);
    },
  },
  mutations: {
    set_questionTopic(state, questionTopic) {
      state.questionTopic = questionTopic;
    },
  },
};
