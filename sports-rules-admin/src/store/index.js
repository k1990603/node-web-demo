/*
 * @Date           : 2022-04-05 14:23:04
 * @LastEditTime: 2022-07-31 17:24:57
 * @Description    :
 */
import { store } from "quasar/wrappers";
import { createStore } from "vuex";

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
import window_resize from "./module/window_resize";
import questionTopic from "./module/questionTopic";
import all_menu from "./module/all_menu";
import user from "./module/user";
import all_document from "./module/all_document";
import all_faq from "./module/all_faq";
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      window_resize,
      questionTopic,
      all_menu,user,
      all_document,
      all_faq,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
