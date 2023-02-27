/*
 * @Author         : your name
 * @Date           : 2022-03-12 22:19:04
 * @LastEditTime: 2022-08-01 17:34:11
 * @LastEditors: Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sports-rules-admin\src\pages\updateRecord\config\index.js
 */

import moment from "moment";

import { utils } from "src/boot/utils";
export const columns = [
  { name: "id", align: "left", label: "ID", field: "id" },
  {
    name: "name_zh",
    align: "left",
    label: "标题  中文",
    field: "name_zh",
    format: utils.default_format_substring,
  },
  {
    name: "name_en",
    align: "left",
    label: "标题  英文",
    field: "name_en",
    format: utils.default_format_substring,
  },

  {
    name: "document",
    align: "left",
    label: "关联文档",
    field: "document",
  },

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
