/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\controller\document.js
 */
const Controller = require("egg").Controller;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { STRING, INTEGER, DATE } = Sequelize;
class DocumentController extends Controller {
  async docandmdfindAll() {
    const ctx = this.ctx;
    try {
      const { name = "", state, language } = ctx.query;
      const options = {
        order: [["updated_at", "desc"]],
        where: {
          [Op.and]: [
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
            state ? { state: { [Op.like]: `${state}` } } : {},
          ],
        },
      };
      const data = await ctx.model.Document.findAll(options);
      let result = { docs: [] };
      let docs = [];
      const fetchNums = vegs => {
        const promises = vegs.map(async function (element) {
          const md = await ctx.model.Mddocpool.findAll({
            where: {
              [Op.and]: [{ state: 1 }, { document: element.id }],
              language: {
                [Op.or]: language.split(","),
              },
            },
          });
          let newval = { ...element.dataValues };
          if (md.length > 0) {
            newval.doc = md;
          }
          result.docs.push(newval);
        });
        return Promise.all(promises);
      };
      await fetchNums(data);
      ctx.api_success_data(result);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async findAll() {
    const ctx = this.ctx;
    try {
      const { pageSize = 10, currentPage = 1, name = "", state, language = "" } = ctx.query;
      const options = {
        // attributes: ['id', 'name'],
        page: Number(currentPage), // Default 1
        paginate: Number(pageSize), // Defau25
        order: [["updated_at", "desc"]],
        where: {
          [Op.and]: [
            language
              ? {
                  mulit_language: { [Op.like]: `%${JSON.stringify(language)}:1%` },
                }
              : {},
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
            state ? { state: { [Op.like]: `${state}` } } : {},
          ],
        },
      };
      // ctx.body = await ctx.model.Document.findAll(query);
      const data = await ctx.model.Document.paginate(options);
      ctx.api_success_data(data);
    } catch (error) {
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
      const result = await ctx.model.Document.findByPk(id);
      ctx.api_success_data(result);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async create() {
    const ctx = this.ctx;
    try {
      const { name_zh, name_en, mark, state, mulit_language } = ctx.request.body;
      const obj = {
        name_zh,
        name_en,
        mark,
        state,
        mulit_language: JSON.stringify(mulit_language),
      };
      const document = await ctx.model.Document.create(obj);
      ctx.api_success_data(document);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async update() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const document = await ctx.model.Document.findByPk(id);
      if (!document) {
        ctx.api_fail_msg("数据不存在");
      }
      const { name_zh, name_en, mark, state, mulit_language } = ctx.request.body;

      const menu = await ctx.model.Menu.findAll({
        where: {
          related_doc: id,
        },
      });
      console.warn(menu, 11111111111);
      if (state == -1 && menu.length != 0) {
        ctx.api_error_msg("菜单已经在使用此文档，无法关闭。请先在菜单中取消关联！");
      } else {
        await document.update({
          name_zh,
          name_en,
          mark,
          state,
          mulit_language: JSON.stringify(mulit_language),
        });
        ctx.api_success_data(document);
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async destroy() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const document = await ctx.model.Document.findByPk(id);
      const result = await ctx.model.Mddocpool.findAll({
        where: {
          document: id,
        },
      });
      if (result.length == 0) {
        await document.destroy();
        ctx.api_success_data(id);
      } else {
        ctx.api_error_msg("请先删除关联的md文档");
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
}
module.exports = DocumentController;
