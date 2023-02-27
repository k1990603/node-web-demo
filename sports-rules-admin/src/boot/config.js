/*
 * @Date           : 2022-04-05 11:58:02
 * @LastEditTime   : 2022-04-15 11:38:47
 * @Description    :
 */
import { boot } from "quasar/wrappers";

import { Notify } from "quasar";

//项目 选择 配置
const project_options = [
  { label: "OB体育", value: 1 },
  { label: "熊猫体育", value: 2 },
];

//对接类型配置
const api_options = [
  { label: "免转API", value: 1 },
  { label: "转账API", value: 2 },
];

let config = {
  // 是否显示 删除按钮
  show_delete: process.env.NODE_ENV == "development",
  //项目 选择 配置
  project_options,
  //对接类型配置
  api_options,
  //项目 选择 配置 显示
  show_project(val) {
    if (!val) {
      return "";
    }
    let obj = project_options.find((x) => x.value == val);
    return obj.label;
  },
  //对接类型配置 显示
  show_api(val) {
    if (!val) {
      return "";
    }
    let obj = api_options.find((x) => x.value == val);
    return obj.label;
  },
};

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$lodash

  app.config.globalProperties.$config = config;
});

export { config };
