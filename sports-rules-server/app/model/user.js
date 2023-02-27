const sequelizePaginate = require("sequelize-paginate");
module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: STRING(64),
      comment: "名字",
    },
    password: {
      type: STRING(64),
      comment: "密码",
    },
    admin: {
      type: INTEGER,
      comment: "管理员，1是 ，null,0 不是",
      defaultValue: 0,
    },
    //备注
    mark: {
      type: TEXT,
      comment: "备注",
    },
  });

  // User.findByLogin = async function(login) {
  //   return await this.findOne({
  //     where: {
  //       login: login
  //     }
  //   });
  // }

  // don't use arraw function
  // User.prototype.logSignin = async function() {
  //   return await this.update({ last_sign_in_at: new Date() });
  // }

  sequelizePaginate.paginate(User);

  return User;
};
