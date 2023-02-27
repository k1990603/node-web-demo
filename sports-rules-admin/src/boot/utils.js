/*
 * @Date           : 2022-04-05 11:58:02
 * @LastEditTime: 2022-08-01 17:44:19
 * @Description    :
 */
import { boot } from "quasar/wrappers";
import { copyToClipboard } from "quasar";
const API_BASEURL = process.env.API_BASEURL;
import { Notify } from "quasar";
let utils = {
  /**
   *
   * @param {*} obj  需要 移除假值的对象
   * @param {*} exclude_keys   不参与计算的key ， 如果这些key 对应假值 将保留
   */
  remove_false_key(obj = {}, exclude_keys = []) {
    for (let i in obj) {
      if (!exclude_keys.includes(i) && !obj[i]) {
        delete obj[i];
      }
    }
  },
  /**
   * 生产随机字符串
   */
  randomstring(n = 16) {
    let result = "";
    let str = "ABCDEFGH1人KLMNOPQRSTUVWXYZabCdefghijk1mnopqrstuVWxyz0123456789";
    for (let i = 0; i < n; i++) {
      let i = Math.floor(Math.random() * str.length);
      result += str[i];
    }

    return result;
  },
  /**
   *
   * 默认截取
   */
  default_format_substring(val = "") {
    if (!val) return;
    val = val && val.trim();
    let str = val;
    if (str.length > 20) {
      str = val ? (val || "").substring(0, 20) + "..." : "";
    }

    return str;
  },

  /**
   *
   * 显示路径替换
   */
  replace_content_to_show(val = "") {
    //<img src="http://127.0.0.1:17101/public/1.png" style="zoom: 60%;">
    //<img src="/public/1.png" style="zoom: 60%;">

    var re = new RegExp(`src="/public/`, "g");

    //  return     val.replace(/src=\"\/public\//g,`src="${API_BASEURL}/public/`)
    return val.replace(re, `src="${API_BASEURL}/public/`);
  },

  /**
   *
   * 提交路径替换
   */
  replace_content_to_send(val = "") {
    // <img src=\"http://172.21.165.161:17101/public/

    var re = new RegExp(`src=\"${API_BASEURL}/public/`, "g");
    return val.replace(re, `src=\"/public/`);
  },

  /**
   * 复制内容
   */

  copy_text(text = "") {
    copyToClipboard(text)
      .then(() => {
        // success!

        Notify.create({
          message: "复制成功： " + text,
        });
      })
      .catch(() => {
        // fail

        Notify.create({
          message: "复制失败，请自己手动选中进行复制。",
        });
      });
  },
};

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$lodash

  app.config.globalProperties.$utils = utils;
});

export { utils };
