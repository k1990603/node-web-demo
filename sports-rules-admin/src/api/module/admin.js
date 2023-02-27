/*
 * @Author         : your name
 * @Date           : 2022-03-12 15:12:14
 * @LastEditTime   : 2022-03-12 15:12:14
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \client-api-doc-admin\src\api\module\admin.js
 */

import axios  from "src/api/commom/axioswapper.js"

let prefix=process.env.API_PREFIX_1
//管理员登录接口
export const handle_login = (params, url='/user/login') => axios.post(`${prefix}${url}`, params)

