<!--
 * @Date           : 2022-04-11 11:16:33
 * @LastEditTime: 2022-08-06 17:39:05
 * @Description    :
-->
<template>
  <div class="q-px-md border-grey br4 q-ml-md q-py-md column   upload-file" style="min-height:500px ">

    <div class="">
      <q-select filled dense emit-value label="上传类型" map-options :options="upload_type_options" v-model="upload_type" />
    </div>
    <div class="ralative-position w200 h30  ">
      <q-file class="absolute  w200 h30" style="z-index: 6" flat dense @update:model-value="handle_content_files_update">
        <template v-slot:file="{ index, file }"> </template>
      </q-file>
      <q-btn color="primary" class="absolute  w200  h40" style="z-index: 3">
        选择文件</q-btn>
    </div>
    <div class="text-red "> 视频只能mp4 类型</div>
    <div class=" text-red "> 除了图片，MD文档外 <br> 其他文件类型建议 zip 打包后上传 </div>

    <div class="fw600"> 插入超链接配置:</div>
    <div>
      <q-input filled dense v-model="link_url" label="链接实际地址" />
    </div>
    <div>
      <q-input filled dense v-model="link_text" label="链接显示文字" />
    </div>
    <div>
      <q-btn color="primary" class="absolute  w200  h40" style="z-index: 3" @click="handle_add_link">
        确定插入超链接</q-btn>

    </div>
    <!-- <div>   <a href="http://localhost:38888/#/main/docpool" target="_blank" rel="noopener noreferrer">sxsac</a>  </div> -->
  </div>
</template>
<script>
const API_BASEURL = process.env.API_BASEURL;
import { api_file } from "src/api/index";
export default {
  emits: ["emit-html-str"],
  data () {
    return {
      upload_type_options: [
        {
          label: "图片",
          value: 1,
        },
        {
          label: "视频",
          value: 2,
        },
        {
          label: "其他文件",
          value: 3,
        },
      ],
      // 上传类型
      upload_type: 1,
      //中文内容 旁边的插入图片
      content_zn_files: null,
      //英文内容 旁边的插入图片
      content_en_files: null,
      //链接实际地址
      link_url: "",
      // 链接显示文字
      link_text: '',

    };
  },
  props: {
    // 当前上传文件的 内容对应的 表单 key
    key_str: {
      type: String,
      default: "",
      require: true,
    },
  },
  methods: {
    /**
     * 文件上传
     * @param {*} files
     */
    async handle_upload (files = []) {
      console.log("this.files----", this.files);
      let len = files.length;
      if (len == 0) {
        return false;
      }
      let form = new FormData();
      for (let i = 0; i < len; i++) {
        form.append("files[]", files[i]);
      }
      form.set("other", 1);
      let res = await api_file.handle_upload(form);
      form = null;
      console.log(res.data);
      let { code, data, msg, success } = res.data;
      if (success) {
        return data;
      } else {
        return "";
      }
    },
    //通用内容 文件 更新
    async handle_content_files_update (value) {
      console.log(" //中文内容 文件 更新");
      console.log(value);
      let name = value.name;
      if (!name) {
        return false;
      }
      let data = await this.handle_upload([value]);

      if (!data) {
        this.$q.notify('上传文件出错')
        return false
      }



      console.log(data);
      let path = data[name].filepath;
      let url = API_BASEURL + '/' + path;
      let str = ` `;
      switch (this.upload_type) {
        case 1:
          //   图片
          str = ` <div class="text-center"><img src="${url}" style="zoom: 60%;" ></div>`;
          break;
        case 2:
          //   视频
          str = ` <video controls width="800">
        <source src="${url}" type="video/mp4">   Sorry, your browser doesn't support embedded videos.
     </video>`;
          break;
        case 3:
          //   其他文件
          str = `  <a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>  `;
          break;
        default:
          str = "";
          break;
      }
      this.$emit("emit-html-str", {
        key: this.key_str,
        str,
      });
    },
    //插入超链接
    handle_add_link () {

      if (!this.link_url || !this.link_text) {
        this.$q.notify('链接地址和链接文字必须都填写')
        return false
      }

      let str = `<a href="${this.link_url}" target="_blank" rel="noopener noreferrer">${this.link_text}</a> `
      this.$emit("emit-html-str", {
        key: this.key_str,
        str,
      });

    }
  },
};
</script>
<style lang="scss" scoped>
.upload-file > div {
  margin-bottom: 10px;
}
</style>
