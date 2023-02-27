/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:19:23
 * @LastEditTime: 2023-02-13 11:23:41
 * @LastEditors: Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sports-rules-admin\src\api\commom\axioswapper.js
 */

import { SessionStorage, Notify } from "quasar";

import axios from "axios";

const API_BASEURL = process.env.API_BASEURL;
const api = axios.create({ baseURL: API_BASEURL });

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let token = SessionStorage.getItem("token");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    console.log(response);
    let url = response.config.url;
    let show_notify =
      url.includes("create") ||
      url.includes("update") ||
      url.includes("disable") ||
      url.includes("delete");

    if (response.data.code == "100003") {
      Notify.create({
        message: "登录已失效，请重新登录！",
        color: "red",
      });
      window.location.href = window.location.origin;
    }
    if (show_notify) {
      if (response.data.code == "000000") {
        Notify.create({
          message: "操作成功",
          color: "secondary",
        });
      }
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;
