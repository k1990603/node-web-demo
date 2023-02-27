/*
 * @Author: eisha
 * @Description:1
 * @FilePath: \sports-rules-server\app\router.js
 */
"use strict";

// //删除 API
// api_fn_delete:function(){  return  this.api_namespace.handle_delete || temp_promise_fn},
// //修改 API
// api_fn_update: function(){  return   this.api_namespace.handle_update || temp_promise_fn},
// //查询 API
// api_fn_read: function(){  return   this.api_namespace.handle_read || temp_promise_fn},
// //禁用 API
// api_fn_disable:function(){  return   this.api_namespace.handle_disable || temp_promise_fn},
// //详情 API
// api_fn_info: function(){  return   this.api_namespace.handle_info || temp_promise_fn},

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // console.log( app );
  const { router, controller, jwt } = app;
  router.get("/", controller.home.index);

  require("./router/language")(app);
  require("./router/user")(app);
  require("./router/menu")(app);
  require("./router/document")(app);
  require("./router/mddocpool")(app);
  require("./router/packingrecords")(app);
  require("./router/updaterecord")(app);
  require("./router/file")(app);
};
