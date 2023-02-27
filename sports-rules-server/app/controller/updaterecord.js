/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\controller\updaterecord.js
 */
const Controller = require("egg").Controller;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { STRING, INTEGER, DATE } = Sequelize;
class updaterecordController extends Controller {
  async findAll() {
    const ctx = this.ctx;
    try {
      const { pageSize = 10, currentPage = 1, name = "", document, state } = ctx.query;
      const options = {
        // attributes: ['id', 'name'],
        page: Number(currentPage), // Default 1
        paginate: Number(pageSize), // Default 25
        order: [
          ["updated_at", "desc"],
          ["is_top", "desc"],
        ],

        where: {
          [Op.and]: [
            state? {
              state: { [Op.like]: state },
            }:{},
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
              }:{},
            document
              ? {
                  document: { [Op.like]: `${document}` },
                }
              : {},
          ],
        },
      };
      // ctx.body = await ctx.model.Updaterecord.findAll(query);
      const data = await ctx.model.Updaterecord.paginate(options);
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
      const result = await ctx.model.Updaterecord.findByPk(id);
      ctx.api_success_data(result);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async create() {
    const ctx = this.ctx;
    try {
      const {
        name_zh,
        name_en,
        content_zh = "",
        content_en = "",
        document_staff,
        document,
        state,
        is_top,
      } = ctx.request.body;
      const obj = {
        name_zh,
        name_en,
        content_zh,
        content_en,
        document_staff,
        document,
        state,
        is_top,
      };
      console.warn(ctx.request.body, 1111111111);
      const updaterecord = await ctx.model.Updaterecord.create(obj);
      ctx.api_success_data(updaterecord);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }

  async update() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const updaterecord = await ctx.model.Updaterecord.findByPk(id);
      if (!updaterecord) {
        ctx.api_fail_msg("数据不存在");
      }
      const { name_zh, name_en, content_zh, content_en, document_staff, document, state, is_top } =
        ctx.request.body;
      await updaterecord.update({
        name_zh,
        name_en,
        content_zh,
        content_en,
        document_staff,
        document,
        state,
        is_top,
      });
      ctx.api_success_data(updaterecord);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async destroy() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const updaterecord = await ctx.model.Updaterecord.findByPk(id);

      await updaterecord.destroy();
      ctx.api_success_data(id);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
}
module.exports = updaterecordController;
