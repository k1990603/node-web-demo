/*
 * @Date           : 2022-04-03 13:35:21
 * @LastEditTime: 2022-09-09 19:08:00
 * @Description    :
 */
"use strict";

const Service = require("egg").Service;
const fsPromises = require("fs").promises;
const fs = require("fs");
const { mkdir } = fsPromises;
const moment = require("moment");
const path = require("path");

const uuid = require("uuid").v1;

class FileUploadService extends Service {
  /**
   *  获取文件 上传目录
   * @returns
   */

  async getUploadFile(filename, type = "other") {
    //获取当前日期
    let day = moment().format("YYYYMMDD");
    console.log(day);
    // 基础配置
    //  let basedir =   this.config.upload_dir+type;
    let basedir = this.config.upload_dir + type;

    //创建 文件的保存路径
    let dir = path.join(basedir, day);
    //不存在就创建目录
    await mkdir(dir, { recursive: true });
    //生成uuid 文件名字
    let uid = uuid().replace(/-/gi, "");
    //新文件名字
    let new_file_name = uid + path.extname(filename);
    //完整路径
    let filepath = path.join(dir, new_file_name);
    return {
      //完整路径
      filepath,
      // 保存目录  : this.ctx.origin + uploadDir.slice(3).replace(/\\/g, '/')
      save_dir: filepath.replace(/\\/g, "/"),
      //文件名字
      filename: new_file_name,
    };
  }
  /**
   * @description 删除文件
   * @param
   * @return
   */
  async deletefile(filepath) {
    const ctx = this.ctx;
    let path_ = filepath.split("/").join("\\");
    // 基础配置

    //创建 文件的保存路径
    try {
      let success = true;
      fs.unlink(path_, function (error) {
        if (error) {
          success = false;
        }
      });
      if (success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
}

module.exports = FileUploadService;
