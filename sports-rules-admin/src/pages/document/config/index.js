/*
 * @Author         : your name
 * @Date           : 2022-03-12 22:19:04
 * @LastEditTime: 2022-07-30 18:54:24
 * @LastEditors: Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sports-rules-admin\src\pages\document\config\index.js
 */

import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  { name: "name_zh", align: "left", label: "中文名字", field: "name_zh" },
  { name: "name_en", align: "left", label: "英文名字", field: "name_en" },

  {
    name: "mulit_language",
    align: "left",
    label: "多语言启用",
    field: "mulit_language",
  },
  { name: "mark", align: "left", label: "备注", field: "mark" },

  {
    name: "createdAt",
    align: "left",
    label: "创建时间",
    field: "createdAt",

    format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""),
  },
  {
    name: "updatedAt",
    align: "left",
    label: "更新时间",
    field: "updatedAt",
    format: (val) => (val ? moment(val).format("YYYY-MM-DD HH:mm:ss ") : ""),
  },

  {
    name: "handle",
    align: "left",
    label: "操作",
    field: "handle",
    style: "width: 160px",
  },
];
