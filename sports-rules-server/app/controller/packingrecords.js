/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\controller\packingrecords.js
 */
const Controller = require("egg").Controller;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { STRING, INTEGER, DATE } = Sequelize;
class PackingrecordsController extends Controller {
  async findAll_object() {
    const ctx = this.ctx;
    try {
      const { env, author, type } = ctx.query;
      const options = {
        order: [["updated_at", "desc"]],
        where: {
          [Op.and]: [
            env
              ? {
                  env: { [Op.like]: env },
                }
              : {},
            author
              ? {
                  author: { [Op.like]: `%${author}%` },
                }
              : {},
            type
              ? {
                  langutypege: { [Op.like]: type },
                }
              : {},
          ],
        },
      };
      // ctx.body = await ctx.model.Packingrecords.findAll(query);
      const data = await ctx.model.Packingrecords.findAll(options);
      let obj = { ceshi: "", geli: "", shiwan: "", shengchan: "", quanliang: "" };
      if (data.length > 0) {
        let env_list = {};
        data.forEach(val => {
          //全量
          if (!env_list[val.env]) {
            env_list[val.env] = [];
          }
          env_list[val.env].push(val);
        });
        //全量
        let data_ = {};
        Object.keys(obj).forEach(item => {
          if (env_list[item] && env_list[item].length != 0) {
            //开启状态
            //最近更新文件
            data_[item] = new Date(env_list[item][0].updatedAt).valueOf();
          } else {
            data_[item] = "";
          }
        });
        ctx.api_success_data(data_);
      } else {
        ctx.api_success_data(obj);
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async findAll() {
    const ctx = this.ctx;
    try {
      const { pageSize = 20, currentPage = 1, env, author, type } = ctx.query;
      const options = {
        // attributes: ['id', 'name'],
        page: Number(currentPage), // Default 1
        paginate: Number(pageSize), // Default 25
        order: [["updated_at", "desc"]],
        where: {
          [Op.and]: [
            env
              ? {
                  env: { [Op.like]: env },
                }
              : {},
            author
              ? {
                  author: { [Op.like]: `%${author}%` },
                }
              : {},
            type
              ? {
                  langutypege: { [Op.like]: type },
                }
              : {},
          ],
        },
      };
      // ctx.body = await ctx.model.Packingrecords.findAll(query);
      const data = await ctx.model.Packingrecords.paginate(options);
      ctx.api_success_data(data);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async create() {
    const ctx = this.ctx;
    try {
      const { env, author, mark, type } = ctx.request.body;
      const obj = {
        env,
        author: ctx.state.user.name,
        mark,
        type,
      };
      const data = await ctx.model.Packingrecords.findAll({
        order: [["updated_at", "desc"]],
        where: {
          env,
        },
      });
      if (data.length > 0) {
        //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
        var dateBegin = new Date(data[0].updatedAt); //将-转化为/，使用new Date
        var dateEnd = new Date(); //获取当前时间
        var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
        var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
        var leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
        let text =
          " 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒";
        if (dayDiff == 0 && hours == 0 && minutes < 10) {
          //必须间隔10分钟
          ctx.api_error_msg("点击太过频繁，请等几分钟再试！");
        } else {
          const packingrecords = await ctx.model.Packingrecords.create(obj);
          ctx.api_success_data(packingrecords);
        }
      } else {
        const packingrecords = await ctx.model.Packingrecords.create(obj);
        ctx.api_success_data(packingrecords);
      }
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
      const result = await ctx.model.Packingrecords.findByPk(id);
      ctx.api_success_data(result);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  async destroy() {
    const ctx = this.ctx;
    try {
      const id = ctx.toInt(ctx.request.body.id);
      const packingrecords = await ctx.model.Packingrecords.findByPk(id);

      await packingrecords.destroy();
      ctx.api_success_data(id);
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
}
module.exports = PackingrecordsController;
