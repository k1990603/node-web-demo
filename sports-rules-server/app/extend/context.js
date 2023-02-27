

const MSG_CODE = require("../config/msg_code.js")

module.exports = {
     a_1111 :888,
     b_xsaxd(){
       
     },

     toInt(str) {
          if (typeof str === 'number') return str;
          if (!str) return str;
          return parseInt(str, 10) || 0;
        },
 /**
        * API 成功 返回体
        * @param {*} params
        */
       api_success(params) {
         let { code =  MSG_CODE.success.code, msg =  MSG_CODE.success.msg, data = "" } = params;
         this.status = 200;
         this.body = {
           code,
           msg,
           data,
           success: true,
         };
       },
       /**
        * API 成功 返回体
        * @param {*} params
        */
       api_success_data(data = "") {
         // console.log(' api_success_data(data = "")', data );
         this.api_success({ data });
       },
     
       /**
        * API 失败 返回体
        * @param {*} params
        */
       api_fail(params) {
         let {code =  MSG_CODE.fail.code, msg =  MSG_CODE.fail.msg, data = "" } = params;
         this.status = 200;
         this.body = {
           code,
           msg,
           data,
           success: false,
         };
       },
       /**
        * API 失败 返回体
        * @param {*} params
        */
       api_fail_msg(msg = "fail") {
         this.api_fail({ msg ,code:MSG_CODE.fail.code });
       },
      
       /**
        * API 错误 返回体
        * @param {*} params
        */
        api_error_msg(msg = "error") {
          console.log( "收到的 异常信息如下 ---");
          console.log(msg);
         this.api_fail({ msg,code:MSG_CODE.error.code });
       },  
 

}