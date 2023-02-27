/*
 * @Date           : 2022-03-29 22:52:39
 * @LastEditTime: 2022-08-03 17:15:00
 * @Description    :
 */

import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//上传
export const handle_upload = (params, url = "/file/upload") =>
  axios.post(`${prefix}${url}`, params);

export const handle_read_md_file = (params, url = "") =>
  axios.get(`${url}`, { params: { ...params } });
//写入
export const handle_writerfile = (params, url = "/file/writerfile") =>
  axios.post(`${prefix}${url}`, params);

//创建并写入
export const handle_writerandcreate = (params, url = "/file/writeandcreate") =>
  axios.post(`${prefix}${url}`, params);
