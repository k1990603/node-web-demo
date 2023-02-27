/*
 * @Date           : 2022-03-29 21:41:11
 * @LastEditTime: 2022-08-03 18:02:18
 * @Description    :
 */
"use strict";
const pump = require("pump");
const Controller = require("egg").Controller;

const fsPromises = require("fs").promises;
const fs = require("fs");
class FileUploadController extends Controller {
  // https://github.com/eggjs/egg-multipart#upload-multiple-files

  /**
   *
   * 转化 文件类型到 自定义的  type
   *
   */
  compute_type_by_file(file = {}) {
    let { mimeType = "", filename = "" } = file;
    let str = "";
    if (mimeType.includes("image")) {
      str = "image";
    } else if (mimeType.includes("video")) {
      str = "video";
    } else {
      if (filename.endsWith(".md")) {
        str = "md";
      } else {
        str = "other";
      }
    }
    return str;
  }
  /**
   * 上传文件内部方法
   *
   */
  async save_file() {
    const ctx = this.ctx;
    console.log("保存图片-----", ctx.request.body);
    console.log("保存图片-----1", 666);
    console.log("保存图片----files-");
    let files = ctx.request.files;
    let other = ctx.request.body.other;
    console.log("got %d files", files.length);
    console.log("files---");
    let result = {
      success: "",
      data: {},
    };
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log("file-----", file);
        console.log("field: " + file.fieldname);
        console.log("filename: " + file.filename);
        console.log("encoding: " + file.encoding);
        console.log("mime: " + file.mime);
        console.log("tmp filepath: " + file.filepath);
        // field: 'files',
        // filename: '11111111111111.png',
        // encoding: '7bit',
        // mime: 'image/png',
        // fieldname: 'files',
        // transferEncoding: '7bit',
        // mimeType: 'image/png',
        // filepath: 'C:\\Users\\admin\\AppData\\Local\\Temp\\egg-multipart-tmp\\client-api-doc-server\\2022\\04\\03\\12\\d5002e4c-d71a-4332-aa30-b030940505e7.png'
        try {
          // process file or upload to cloud storage
          // 文件名字
          const filename = file.filename;
          // 转换类型
          const type = this.compute_type_by_file(file);
          // 上传图片的目录
          const save_target = await this.service.fileUpload.getUploadFile(filename, type);
          console.log("计算后的存放路径---- ", save_target);
          const oldPath = file.filepath;
          const newPath = save_target.filepath;
          await fsPromises.copyFile(oldPath, newPath);

          result["data"][filename] = {
            filename: save_target.filename,
            filepath: save_target.save_dir,
          };
        } finally {
          // remove tmp files and don't block the request's response
          // cleanupRequestFiles won't throw error even remove file io error happen
          ctx.cleanupRequestFiles([file]);
        }
      }
      result.success = true;
    } catch (error) {
      result.success = false;
      result.msg = error;
    }
    console.log(result);
    return result;
  }
  // https://github.com/eggjs/egg-multipart#upload-multiple-files
  /**
   * 保存 文件
   */
  async save() {
    const ctx = this.ctx;
    const result = await this.save_file();
    if (result.success) {
      ctx.api_success_data(result.data);
    } else {
      ctx.api_error_msg(result.msg);
    }
  }
  /**
   * @description 创建并写入md
   * @param
   * @return
   */
  async writeandcreate() {
    const ctx = this.ctx;
    const { content, path } = ctx.request.body;
    let result = {
      success: "",
      data: {},
    };
    const save_target = await this.service.fileUpload.getUploadFile("create.md", "md");

    console.log( 'save_target-',save_target );
    try {
      // appInfo.baseDir
      let success = true;
      await fs.writeFile(save_target.filepath, content, function (error) {
        if (error) {
          success = false;
        }
      });
      
      if (success) {
        result["data"] = {
          filename: save_target.filename,
          filepath: save_target.save_dir,
        };
        ctx.api_success_data(result);
      } else {
        ctx.api_error_msg("写入失败");
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
  /**
   * @description 写入文件
   * @param
   * @return
   */
  async writerfile() {
    const ctx = this.ctx;
    const { content, path } = ctx.request.body;
    let path_ = ("app/" + path).split("/").join("\\");
    try {
      let success = true;
      fs.writeFile(path_, content, function (error) {
        if (error) {
          success = false;
        }
      });
      if (success) {
        ctx.api_success_data();
      } else {
        ctx.api_error_msg("写入失败");
      }
    } catch (error) {
      ctx.api_error_msg(error);
    }
  }
}
module.exports = FileUploadController;
