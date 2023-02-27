/*
 * @Author: eisha
 * @Description:
 * @FilePath: \sports-rules-server\app\controller\home.js
 */
"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
}

module.exports = HomeController;
