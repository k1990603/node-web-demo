/*
 * @Author         : your name
 * @Date           : 2022-03-13 20:25:44
 * @LastEditTime   : 2022-04-10 22:09:53
 * @LastEditors    : Please set LastEditors
 * @Description    : 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath       : \client-api-doc-admin\src\mixin\index.js
 */

 // 窗口改变 以及表格高度计算 逻辑
import window_size_mixin from "./module/window_size"
//表格 页面 CRUD 基本流程逻辑
import table_crud_mixin from "./module/table_crud"
//图片上传
import image_upload_mixin from "./module/image_upload"
// 编辑组件的通用混入 
import edit_component_mixin from "./module/edit_component.mixin"




export {
    window_size_mixin,
    table_crud_mixin,
    image_upload_mixin,
    edit_component_mixin

}
