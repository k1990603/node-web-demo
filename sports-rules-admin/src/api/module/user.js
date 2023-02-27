/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:13:06
 * @LastEditTime   : 2022-04-06 13:11:50
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : /client-api-doc-admin/src/api/module/user.js
 */

import axios  from "src/api/commom/axioswapper.js"

let prefix=process.env.API_PREFIX_1+'/user/';

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })


export const handle_read = (params, url='read') => axios.get(`${prefix}${url}`, { params: {...params } });

export const handle_create = (params, url='create') => axios.post(`${prefix}${url}`, params);

export const handle_update = (params, url='update') => axios.post(`${prefix}${url}`, params);

export const handle_delete = (params, url='delete') => axios.post(`${prefix}${url}`, params);

export const handle_login = (params, url='login') => axios.post(`${prefix}${url}`, params);

