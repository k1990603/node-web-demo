/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\controller\language.js
 */

"use strict";

const { Controller } = require("egg");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { STRING, INTEGER, DATE } = Sequelize;
class LanguageController extends Controller {
  async findAll() {
    const { ctx } = this;

    try {
      const { pageSize = 10, currentPage = 1, name = "", state } = ctx.query;
      const options = {
        // attributes: ['id', 'name'],
        page: Number(currentPage), // Default 1
        paginate: Number(pageSize), // Default 25
        // order: [['name', 'DESC']],

        order: [["order", "asc"]],
        where: {
              [Op.and]: [
                state
                  ? {
                      state: { [Op.like]: state },
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
                    }:{}
                  
              ],
            },
      };
      const data = await ctx.model.Language.paginate(options);
      ctx.api_success_data(data);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }

  async create() {
    const ctx = this.ctx;

    try {
      const { name_zh, name_en, order, value, default_language, state } = ctx.request.body;
      const language = await ctx.model.Language.create({
        name_zh,
        name_en,
        order,
        value,
        default_language,
        state,
      });

      ctx.api_success_data(language);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }

  async update() {
    const ctx = this.ctx;

    try {
      const id = ctx.toInt(ctx.request.body.id);
      const language = await ctx.model.Language.findByPk(id);
      if (!language) {
        ctx.api_fail_msg("未找到数据");
      }

      const { name_zh, name_en, order, value, default_language, state } = ctx.request.body;
      await language.update({ name_zh, name_en, order, value, default_language, state });

      ctx.api_success_data(language);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }

  async destroy() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const Language = await ctx.model.Language.findByPk(id);

      await Language.destroy();
      ctx.api_success_data(id);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
}

module.exports = LanguageController;
