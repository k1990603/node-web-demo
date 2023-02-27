/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:13:06
 * @LastEditTime: 2022-08-28 12:02:05
 * @LastEditors: Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sports-rules-admin\src\api\module\packingrecords.js
 */

import axios from "src/api/commom/axioswapper.js";

let prefix = process.env.API_PREFIX_1;

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })

// 增加

export const handle_create = (params, url = "/packingrecords/create") =>
  axios.post(`${prefix}${url}`, params);
// 删除
export const handle_delete = (params, url = "/packingrecords/delete") =>
  axios.post(`${prefix}${url}`, params);


//查询

export const handle_read = (params, url = "/packingrecords/read") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });

//详情

export const handle_info = (params, url = "/packingrecords/info") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
