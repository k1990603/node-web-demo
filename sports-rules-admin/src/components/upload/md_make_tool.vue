<!--
 * @Date           : 2022-04-11 11:16:33
 * @LastEditTime: 2022-07-31 18:00:33
 * @Description    :
-->
<template>
  <div>
    <q-btn label="MD文档制作辅助工具" class="   h40" color="primary" @click="show_dialog = true" />

    <q-dialog v-model="show_dialog">
      <q-card>
        <q-card-section>
          <div class="row">
            <div class="text-h6">MD文档制作辅助工具</div>
            <q-space />
            <q-btn flat icon="close" color="primary" v-close-popup />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-px-md border-grey br4 q-ml-md q-py-md column upload-file" style="min-height: 500px;width:500px">

            <div class="ralative-position w200 h30">
              <q-file class="absolute w200 h30" style="z-index: 6" flat dense @update:model-value="handle_content_files_update">
                <template v-slot:file="{ index, file }"> </template>
              </q-file>
              <q-btn color="primary" class="absolute w200 h40" style="z-index: 3">
                选择文件</q-btn>
            </div>
            <div class="text-red">视频只能mp4 类型</div>
            <div class=" text-red break-all"> 除了图片，MD文档外 其他文件类型建议 zip 打包后上传 </div>
            <div class=" text-red break-all"> MD 文档内 除了基本的文字之外，图片，视频，压缩文件等都必须上传文件后，插入链接 。 否则文件存在于MD文档操作者本地电脑上。保存上传之后网页上是不可能看到你的图片视频等类似附件的内容的。</div>
            <div class=" text-red break-all"></div>

            <div> <span class="text-weight-bolder">文件路径地址 </span>
              <q-btn label="复制路径" color="primary" @click="$utils.copy_text(show_url)" />
            </div>

            <div class="break-all">{{ show_url }}</div>

            <!-- <div>   <a href="http://localhost:38888/#/main/document" target="_blank" rel="noopener noreferrer">sxsac</a>  </div> -->
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="关闭" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
const API_BASEURL = process.env.API_BASEURL;
import { api_file } from "src/api/index";
export default {
  data () {
    return {
      show_dialog: false,


      //中文内容 旁边的插入图片
      content_zn_files: null,
      //英文内容 旁边的插入图片
      content_en_files: null,

      show_url: "",
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
        this.$q.notify("上传文件出错");
        return false;
      }

      let path = data[name] && data[name].filepath;
      let url = API_BASEURL+'/' +path;

      this.show_url = url;
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-file > div {
  margin-bottom: 10px;
}
</style>
