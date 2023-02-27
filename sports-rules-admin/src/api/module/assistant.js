/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:13:06
 * @LastEditTime   : 2022-03-28 14:52:49
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : /client-api-doc-admin/src/api/module/assistant.js
 */

import axios  from "src/api/commom/axioswapper.js"

let prefix =''

//
// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: {...params } })


// 增加

export const handle_create = (params, url="/assistant/create") => axios.post(`${prefix}${url}`, params)
// 删除
export const handle_delete = (params, url='/assistant/delete') => axios.post(`${prefix}${url}`, params)

//修改
export const handle_update = (params, url="/assistant/update") => axios.post(`${prefix}${url}`,  params)


//查询

export const handle_read = (params, url='/assistant/all') => axios.get(`${prefix}${url}`, { params: {...params } })
//详情

export const handle_info = (params, url='/assistant/info') => axios.get(`${prefix}${url}`, { params: {...params } })

//禁用
export const handle_disable = (params, url="/assistant/disable") => axios.post(`${prefix}${url}`,  params)