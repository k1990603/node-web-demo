const Controller = require("egg").Controller;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { STRING, INTEGER, DATE } = Sequelize;
const md5 = require("md5");
class UserController extends Controller {
  async findAll() {
    const ctx = this.ctx;
    try {
      const { pageSize = 10, currentPage = 1, name = "",admin } = ctx.query;
      const options = {
        attributes: ["name", "admin", "createdAt", "updatedAt", "id", "mark"],
        page: Number(currentPage), // Default 1
        paginate: Number(pageSize), // Default 25
        // order: [['name', 'DESC']],
        // where: { name: { [Op.like]: `%elliot%` } }

        where: {
          [Op.and]: [
            admin? {
              admin: { [Op.like]: admin },
            }:{},
            name
              ? {
                name: { [Op.like]: `%${name}%` },
                }
              : {},
          ],
        },
      };
      // ctx.body = await ctx.model.User.findAll(query);
      const data = await ctx.model.User.paginate(options);
      ctx.api_success_data(data);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async create() {
    const ctx = this.ctx;
    try {
      const { name, password, admin = 0, mark = "" } = ctx.request.body;
      const obj = {
        name,
        password: md5(password),
        admin,
        mark,
      };
      const options = {
        where: {
          [Op.and]: [
            {
              name: { [Op.like]: name.trim() },
            },
          ],
        },
      };
      const data = await ctx.model.User.findAll(options);
      let datalength = data.length;
      if (datalength != 0) {
        ctx.api_fail_msg("此用户名已经有人在使用，请修改！");
      } else {
        const user = await ctx.model.User.create(obj);
        ctx.api_success_data(user);
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async update() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const user = await ctx.model.User.findByPk(id);
      if (!user) {
        ctx.status = 404;
        return;
      }
      const { admin, mark } = ctx.request.body;
      if (ctx.state.user.admin == 1) {
        await user.update({ admin, mark });
        ctx.api_success_data(user);
      } else {
        ctx.api_error_msg("不是管理员无修改权限");
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async destroy() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const user = await ctx.model.User.findByPk(id);

      await user.destroy();
      ctx.api_success_data(id);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async login() {
    const { ctx, app } = this;
    try {
      const { name, password } = ctx.request.body;
      // console.log( name, password  );
      const query = {
        name,
      };
      const user = await ctx.model.User.findOne({
        where: query,
      });
      // ctx.api_success_data(user);
      //生成 token 的方式
      if (!user || user.password != password) {
        ctx.api_error_msg("不存在此账号");
      } else {
        let user_ = { ...user.dataValues };
        const token = app.jwt.sign(user_, app.config.jwt.secret);
        // 生成的token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1NjAzNDY5MDN9.B95GqH-fdRpyZIE5g_T0l8RgzNyWOyXepkLiynWqrJg

        // 返回 token 到前端
        user_.token = token;
        ctx.state.user = user_;
        delete user_.password;
        ctx.api_success_data(user_);
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
}
module.exports = UserController;
