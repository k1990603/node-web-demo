<!--
 * @Date           : 2022-04-11 11:16:33
 * @LastEditTime: 2022-08-06 15:41:42
 * @Description    :
-->
<template>
  <div class="br4 row q-gutter-x-md upload-file" style="">
    <div class="ralative-position w160 h30">
      <q-file class="absolute w160 h30" style="z-index: 6" flat dense @update:model-value="handle_content_files_update">
        <template v-slot:file="{ index, file }"> </template>
      </q-file>
      <q-btn color="primary" class="absolute w160 h40" style="z-index: 3">
        上传MD文件</q-btn>
    </div>
    <MdMakeTool />
    <div v-if="file_path.filepath&&detail_obj.id">
      <q-btn class=" w160 h40" color="primary" label="下载最新的MD文件" @click="handle_download_md_file" />
    </div>

  </div>
</template>
<script>
const API_BASEURL = process.env.API_BASEURL;
import { api_file } from "src/api/index";
import MdMakeTool from "src/components/upload/md_make_tool.vue"
export default {
  components: {
    MdMakeTool,
  },
  emits: ["emit-file-path"],
  data () {
    return {};
  },
  props: {
    // 当前上传文件的 内容对应的 表单 key
    key_str: {
      type: String,
      default: "",
      require: true,
    },
    detail_obj: {},
    file_path: {
      type: Object,
      default: {},
      require: false,
    },
  },
  created () { },
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
        this.$q.notify("上传文件出错");
        return false;
      }

      console.log(data);
      let path = data[name];
      let url = API_BASEURL + path;

      this.$emit("emit-file-path", {
        key: this.key_str,
        path,
      });
    },
    /**
     * 下载md 文档
     */
    async handle_download_md_file () {
      let file_path = this.file_path.filepath
      let url = API_BASEURL + '/' + this.file_path.filepath;
      let res = await api_file.handle_read_md_file({}, url);
      let { code, data } = res;
      let bloburl = window.URL.createObjectURL(new Blob([data]));
      console.log(data);
      let filename = file_path.substring(file_path.lastIndexOf("/"));
      let aLink = document.createElement("a");

      aLink.style.display = "none";
      aLink.setAttribute("target", "_blank");
      aLink.setAttribute("download", this.file_path.filename);
      aLink.setAttribute("href", bloburl);

      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);


    },
  },
};
</script>
<style lang="scss" scoped>
.upload-file > div {
  margin-bottom: 10px;
}
</style>
