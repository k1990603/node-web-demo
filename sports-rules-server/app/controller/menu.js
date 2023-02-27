/*
 * @Date           : 2022-03-11 10:59:48
 * @FilePath: \sports-rules-server\app\controller\menu.js
 * @Description    :
 */
"use strict";
const Controller = require("egg").Controller;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { STRING, INTEGER, DATE } = Sequelize;
class MenuController extends Controller {
  /**
   * 查询  全部数据
   * @returns
   */
  async index() {
    const ctx = this.ctx;
    try {
      let query = {};
      const name = ctx.query.name;

      const options = {
        // where:{
        //     name:name
        // }
      };
      // await ctx.sleep(6000);
      const result = await ctx.model.Menu.findAll(options);
      ctx.api_success_data(result);
    } catch (error) {
      console.log(error);
      ctx.api_error_msg(error);
    }
  }
  /**
   * 查询  一条数据  的详细信息
   * @returns
   */
  async show() {
    const ctx = this.ctx;
    try {
      const id = ctx.query.id;
      const result = await ctx.model.Menu.findByPk(id);
      ctx.api_success_data(result);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  /**
   * 创建或者更新数据通用内部方法
   * @returns
   */
  compute_final_obj_when_create_or_update() {
    const ctx = this.ctx;
    let {
      id,
      father_id,
      mark,
      state,
      type,
      order,
      related_doc,
      mulit_language = {},
    } = ctx.request.body;

    const { zh_cn = "", en_gb = "" } = mulit_language;

    let final_obj = {
      id,
      name_zh: zh_cn,
      name_en: en_gb,
      father_id: Number(father_id),
      mark,
      state,
      type,
      order: Number(order),
      related_doc,
      mulit_language: JSON.stringify(mulit_language),
    };

    return final_obj;
  }
  /**
   * 创建或者更新 内部方法
   *
   */
  async create_or_update_inner_function_update_father(final_obj) {
    console.log("final_obj--", final_obj);
    const ctx = this.ctx;
    const resultfather = await ctx.model.Menu.findByPk(final_obj.father_id);
    let resultfather_children = resultfather.children || [];
    resultfather_children.push({ type: "menu", id: final_obj.id, show: false });
  }
  /**
   * 创建  一条数据
   * @returns
   */
  async create() {
    const ctx = this.ctx;
    try {
      let final_obj = this.compute_final_obj_when_create_or_update();
      const result = await ctx.model.Menu.create(final_obj);
      final_obj.id = result.id;

      ctx.api_success_data(result);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  /**
   * 更新  一条数据
   * @returns
   */
  async update() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const Menu = await ctx.model.Menu.findByPk(id);
      if (!Menu) {
        ctx.api_fail_msg("数据不存在");
      }
      const { father_id, mark, state, type, order, related_doc, mulit_language } = ctx.request.body;
      let data = {
        father_id,
        mark,
        state,
        type,
        order,
        related_doc,
      };
      if (mulit_language) {
        const { zh_cn = "", en_gb = "" } = mulit_language;
        data.name_zh = zh_cn;
        data.name_en = en_gb;
        data.mulit_language = JSON.stringify(mulit_language);
      }
      console.warn(ctx.request.body);
      await Menu.update(data);
      ctx.api_success_data(Menu);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  /**
   * 删除  一条数据
   * @returns
   */
  async destroy() {
    const ctx = this.ctx;
    try {
      const id = ctx.request.body.id;
      const resultdoc = await ctx.model.Menu.findByPk(id);
      if (resultdoc.father_id == -1) {
        const result = await ctx.model.Menu.findAll({
          where: {
            father_id: id,
          },
        });
        if (result.length != 0) {
          ctx.api_error_msg("请先删除子级节点");
        } else {
          const result = await resultdoc.destroy();
          ctx.api_success_data(result);
        }
      } else {
        const result = await resultdoc.destroy();
        ctx.api_success_data(result);
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  /**
   * 禁用 一条数据
   */
  async disable() {
    const ctx = this.ctx;
    try {
      const id = ctx.request.body.id;
      const resultdoc = await ctx.model.Menu.findByPk(id);

      if (!resultdoc) {
        ctx.api_fail_msg("数据不存在");
      }

      if (resultdoc.father_id == -1) {
        ctx.api_error_msg("根节点不能更改");
      } else {
        const update = { state: -1 };
        const result = await resultdoc.update(update);
        ctx.api_success_data(result);
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async childrenbylan() {
    const ctx = this.ctx;

    // console.log("ctx.is_client_request(ctx)----",ctx.is_client_request(ctx));
    try {
      const id = ctx.query.id;
      const deep = ctx.query.deep || false;
      const language = ctx.query.language || "";
      const isall = ctx.query.isall;
      let options = {
        attributes: ["id", "mulit_language", "order", "type", "father_id", "related_doc"],
        order: [["order", "asc"]],
        where: {
          [Op.and]: [isall ? {} : { state: 1 }, { father_id: id }],
        },
      };
      let result = await ctx.model.Menu.findAll(options);

      // if (deep && id != -1) {
      let arr = [];

      for (let i = 0; i < result.length; i++) {
        let obj = await this.find_children_deep_inner_by_lan(result[i], language, isall);
        arr.push(obj);
      }

      // console.log( 'arr---------',arr);
      ctx.api_success_data(arr);
      // } else {
      //   ctx.api_success_data(menuandmd);
      // }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }

  /**
   * 内部递归方法-多添加md返回
   * @param {*} params
   * @param {*} obj
   * @returns
   */
  async find_children_deep_inner_by_lan(fatherobj, language, isall) {
    const ctx = this.ctx;
    fatherobj = (fatherobj && fatherobj.dataValues) || fatherobj;
    fatherobj.mulit_language = eval("(" + fatherobj.mulit_language + ")");
    let newval = { ...fatherobj };
    if (newval.related_doc) {
      //判断多语言是否启用没用
      let doc_mulit_language;
      let lan;
      if (isall) {
        lan = language.split(",");
      } else {
        const document = await ctx.model.Document.findByPk(newval.related_doc);
        if (document) {
          doc_mulit_language = eval("(" + document.mulit_language + ")");
          lan = language.split(",").filter(val => {
            if (doc_mulit_language[val] == 1) {
              return val;
            }
          });
        }
      }
      //返回已经启用了的语言
      const md = await ctx.model.Mddocpool.findAll({
        attributes: ["name", "path", "language", "state"],
        order: [["updated_at", "asc"]],
        where: {
          [Op.and]: [isall ? {} : { state: 1 }, { document: newval.related_doc }],
          language: {
            [Op.or]: lan,
          },
        },
      });
      if (md.length > 0) {
        newval.doc = {};
        let md_lan = {};
        md.forEach(val => {
          if (isall) {
            //全量
            if (!md_lan[val.language]) {
              md_lan[val.language] = [];
            }
            md_lan[val.language].push({
              name: val.name,
              path: val.path,
              state: val.state,
            });
          } else {
            newval.doc[val.language] = {
              name: val.name,
              path: val.path,
            };
          }
        });
        //全量
        if (isall) {
          let doc = {};
          Object.keys(md_lan).forEach(item => {
            if (md_lan[item].length == 1) {
              doc[item] = md_lan[item][0];
            } else if (md_lan[item].length != 0) {
              //开启状态
              let item_state_1 = md_lan[item].find(item => item.state == 1);
              if (item_state_1) {
                doc[item] = item_state_1;
              } else {
                //最近更新文件
                doc[item] = md_lan[item][md_lan[item].length - 1];
              }
            }
          });
          newval.doc = doc;
        }
      }
    }
    fatherobj = { ...newval };
    // console.log('内部递归方法');

    if (fatherobj.type == 1 && fatherobj.id != -1) {
      fatherobj["children"] = [];

      let options = {
        attributes: ["id", "mulit_language", "order", "type", "father_id", "related_doc"],
        order: [["order", "asc"]],
        where: {
          [Op.and]: [
            {
              father_id: fatherobj.id,
            },
            isall ? {} : { state: 1 },
          ],
        },
      };
      let result = await ctx.model.Menu.findAll(options);
      let arr = [];
      for (let i = 0; i < result.length; i++) {
        let obj = await this.find_children_deep_inner_by_lan(result[i], language, isall);
        // console.warn(obj.dataValues || obj, 333333333333);
        arr.push(obj.dataValues || obj);
      }
      // console.log( 'fatherobj[children]-------',arr);
      fatherobj["children"] = arr;

      // console.log( 'fatherobj--------',fatherobj);
      return {
        ...fatherobj,
        children: arr,
      };
    } else {
      return fatherobj;
    }
  }
  /**
   * 查询  子节点
   * @returns
   */
  async find_children_deep() {
    const ctx = this.ctx;

    // console.log("ctx.is_client_request(ctx)----",ctx.is_client_request(ctx));
    try {
      const id = ctx.query.id;
      const deep = ctx.query.deep || false;
      const name = ctx.query.name;
      const { state, document } = ctx.query;

      let options = {
        order: [["order", "asc"]],
        where: {
          [Op.and]: [
            { father_id: id },
            state ? { state: state } : {},
            document ? { related_doc: document } : {},
            name
              ? {
                  [Op.or]: [
                    {
                      name_en: { [Op.like]: `%${name}%` },
                    },
                    {
                      name_zh: { [Op.like]: `%${name}%` },
                    },
                  ],
                }
              : {},
          ],
        },
      };
      let result = await ctx.model.Menu.findAll(options);

      //如果递归 文件夹
      if (deep && id != -1) {
        let arr = [];

        for (let i = 0; i < result.length; i++) {
          let obj = await this.find_children_deep_inner(result[i]);
          arr.push(obj);
        }

        // console.log( 'arr---------',arr);
        ctx.api_success_data(arr);
      } else {
        ctx.api_success_data(result);
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  /**
   * 内部递归方法
   * @param {*} params
   * @param {*} obj
   * @returns
   */
  async find_children_deep_inner(fatherobj) {
    // console.log('内部递归方法');
    const ctx = this.ctx;

    if (fatherobj.type == 1 && fatherobj.id != -1) {
      fatherobj["children"] = [];

      let options = {
        where: { father_id: fatherobj.id },
      };
      let result = await ctx.model.Menu.findAll(options);
      let arr = [];

      for (let i = 0; i < result.length; i++) {
        let obj = await this.find_children_deep_inner(result[i]);
        arr.push(obj);
      }

      // console.log( 'fatherobj[children]-------',arr);
      fatherobj["children"] = arr;

      // console.log( 'fatherobj--------',fatherobj);
      return {
        ...fatherobj.toJSON(),
        children: arr,
      };
    } else {
      return fatherobj;
    }
  }
}
module.exports = MenuController;
