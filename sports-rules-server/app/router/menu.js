/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\router\menu.js
 */

"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  const prefix = "/api";

  // app.resources(prefix+'model-name',jwt,'/api/model-name',jwt,app.controller.modelName);
  // app.resources("menu",'/menu',controller.menu)

  /**
   * @apiDefine MyError
   * @apiError  UserNotFound The <code>id</code> of the User was not found.
   */

  /**
   * @api {get} /menu/all  菜单列表
   * @apiGroup  菜单模块
   *
   * @apiParam {Number} limit  每页条数.
   * @apiParam {Number} offset  起始偏移.
   *
   * @apiSuccess {Object[]} data  菜单数据列表.
   * @apiSuccess {String } data.name  菜单名字.
   * @apiSuccess {String } data.age   菜单年龄.
   * @apiUse MyError
   */
  router.get(prefix + "/menu/all", jwt, controller.menu.index);

  /**
 * @api {get} /menu/children  获取菜单子节点
 * @apiGroup  菜单模块
 *
 * @apiParam {Number} id  菜单id.
 *

 */
  router.get(prefix + "/menu/children", jwt, controller.menu.find_children_deep);
  router.get(prefix + "/client/menu/children", controller.menu.childrenbylan);

  /**
 * @api {get} /menu/:id  获取菜单详情
 * @apiGroup  菜单模块
 *
 * @apiParam {Number} id  菜单id.
 *

 */
  router.get(prefix + "/menu/info", jwt, controller.menu.show);

  /**
   * @api {post} /menu    创建菜单
   * @apiGroup  菜单模块
   *
   * @apiBody {String} [name]       菜单名字
   * @apiBody {Number} [age]        菜单年龄
   *
   */
  router.post(prefix + "/menu/create", jwt, controller.menu.create);
  /**
 * @api {post} /menu/edit  修改菜单
 * @apiGroup  菜单模块
 *
 * @apiBody {Number} [id]   菜单id.
 * @apiBody {String} [name]       菜单名字
 * @apiBody {Number} [age]        菜单年龄

 */

  router.post(prefix + "/menu/update", jwt, controller.menu.update);

  /**
 * @api {post} /menu/edit  禁用菜单
 * @apiGroup  菜单模块
 *
 * @apiBody {Number} [id]     菜单id

 */

  router.post(prefix + "/menu/disable", jwt, controller.menu.disable);

  /**
   * @api {post} /menu/delete     删除菜单
   * @apiGroup  菜单模块
   *
   * @apiBody {Number} id  菜单id
   *
   */

  // router.post(prefix + "/menu/delete", jwt, controller.menu.destroy);
};
