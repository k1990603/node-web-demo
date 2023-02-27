/*
 * @Author         : your name
 * @Date           : 2022-03-12 21:39:19
 * @LastEditTime: 2022-07-20 18:13:12
 * @LastEditors: Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \sports-rules-admin\src\boot\ant-design-vue.js
 */

import { boot } from "quasar/wrappers";

import { Pagination, Switch,Tooltip } from "ant-design-vue";
import "ant-design-vue/dist/antd.css"; // or 'ant-design-vue/dist/antd.less'
// import 'ant-design-vue/dist/antd.css';

// import DatePicker from 'ant-design-vue/lib/date-picker'; // 加载 JS
// import 'ant-design-vue/lib/date-picker/style/css'; // 加载 CSS
// import 'ant-design-vue/lib/date-picker/style';         // 加载 LESS

export default boot(({ app }) => {
  app.use(Pagination);
  app.use(Tooltip);
  app.use(Switch);
});
