/*
 * @Author         : your name
 * @Date           : 2022-03-12 22:19:04
 * @LastEditTime: 2022-07-30 11:35:45
 * @LastEditors: Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sports-rules-admin\src\pages\menu\config\index.js
 */

import moment from "moment";

export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  {
    name: "type",
    align: "left",
    label: "类型",
    field: "type",
    style: "width:50px",
  },
  { name: "name_zh", align: "left", label: "标题中文", field: "name_zh" },
  { name: "name_en", align: "left", label: "标题英文", field: "name_en" },

  // { name: "father_id", align: "left", label: "父级ID", field: "father_id" ,  },
  {
    name: "related_doc",
    align: "left",
    label: "关联文档",
    field: "related_doc",
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
