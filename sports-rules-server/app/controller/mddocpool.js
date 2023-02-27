/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\controller\mddocpool.js
 */
const Controller = require("egg").Controller;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { STRING, INTEGER, DATE } = Sequelize;
class MddocpoolController extends Controller {
  async findAll() {
    const ctx = this.ctx;
    try {
      const { pageSize = 20, currentPage = 1, document, language, state } = ctx.query;
      const options = {
        // attributes: ['id', 'name'],
        page: Number(currentPage), // Default 1
        paginate: Number(pageSize), // Default 25
        order: [["updated_at", "desc"]],
        where: {
          [Op.and]: [
            state
              ? {
                  state: { [Op.like]: state },
                }
              : {},
            document
              ? {
                  document: { [Op.like]: document },
                }
              : {},
            language
              ? {
                  language: { [Op.like]: `%${language}%` },
                }
              : {},
          ],
        },
      };
      // ctx.body = await ctx.model.Mddocpool.findAll(query);
      const data = await ctx.model.Mddocpool.paginate(options);
      ctx.api_success_data(data);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async create() {
    const ctx = this.ctx;
    try {
      const { language, name, author, document, state, path } = ctx.request.body;
      const obj = {
        language,
        name,
        author: ctx.state.user.name,
        document,
        state: -1,
        path,
      };
      const mddocpool = await ctx.model.Mddocpool.create(obj);
      ctx.api_success_data(mddocpool);
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
      const result = await ctx.model.Mddocpool.findByPk(id);
      ctx.api_success_data(result);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async update() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const mddocpool = await ctx.model.Mddocpool.findByPk(id);
      if (!mddocpool) {
        ctx.api_fail_msg("数据不存在");
      }
      const { language, name, author, document, state, path, updated_at } = ctx.request.body;
      let datalength = 0;
      let new_doc = document;
      let new_lan = language;

      if (state == 1) {
        const { language, document, state, id } = mddocpool.dataValues;
        const options = {
          where: {
            [Op.and]: [
              {
                language: { [Op.like]: new_lan ? new_lan : language },
              },
              {
                document: { [Op.like]: new_doc ? new_doc : document },
              },
              {
                state: { [Op.like]: 1 },
              },
              {
                id: { [Op.notLike]: id },
              },
            ],
          },
        };
        const data = await ctx.model.Mddocpool.findAll(options);
        datalength = data.length;
      }
      if (datalength != 0) {
        console.warn(" 在当前语种下请先关闭其他历史md文档，再开启此md文档");
        ctx.api_fail_msg("在当前语种下请先关闭其他历史md文档，再开启此md文档");
      } else {
        await mddocpool.update({
          language,
          name,
          author,
          document,
          state,
          path,
          updated_at,
        });
        ctx.api_success_data(mddocpool);
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async destroy() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const mddocpool = await ctx.model.Mddocpool.findByPk(id);

      const is_delete = await this.service.fileUpload.deletefile(mddocpool.path);
      ctx.api_success_data(is_delete);
      if (is_delete) {
        await mddocpool.destroy();
        ctx.api_success_data();
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
}
module.exports = MddocpoolController;
