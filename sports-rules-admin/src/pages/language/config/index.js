/*
 * @Author         : your name
 * @Date           : 2022-03-12 22:19:04
 * @LastEditTime   : 2022-04-13 19:49:28
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : /client-api-doc-admin/src/pages/language/config/index.js
 */

import moment from "moment";

import {utils} from "src/boot/utils"
import {config} from "src/boot/config"


// createdAt: "2022-07-24T06:41:27.000Z"
// default_language: "1"
// id: 1
// name_en: "Chinese simple"
// name_zh: "中文简体"
// order: 1
// state: 1
// updatedAt: "2022-07-24T06:41:27.000Z"
// value: "zh_cn"



export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },


  { name: "name_zh", align: "left", label: "中文名字", field: "name_zh" },
  { name: "name_en", align: "left", label: "英文名字", field: "name_en" },
  { name: "value", align: "left", label: "键", field: "value" },
  { name: "order", align: "left", label: "排序", field: "order" },
  { name: "state", align: "left", label: "状态", field: "state" },
  { name: "default_language", align: "left", label: "回落语言", field: "default_language" },


  {
    name: "createdAt",
    align: "left",
    label: "创建时间",
    field: "createdAt",

    format: (val) => val? moment(val).format("YYYY-MM-DD HH:mm:ss "):'',
  },
  {
    name: "updatedAt",
    align: "left",
    label: "更新时间",
    field: "updatedAt",
    format: (val) => val? moment(val).format("YYYY-MM-DD HH:mm:ss "):'',
  },

  {
    name: "handle",
    align: "left",
    label: "操作",
    field: "handle",
    style: "width: 160px",
  },
];
